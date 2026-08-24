#!/usr/bin/env python3
"""English → Mongolian (Cyrillic) орчуулгын НООРОГ гаргана.

Модель: Tsengel-mn/nllb-mongolian (NLLB-200, M2M100ForConditionalGeneration)
Хэлний код: eng_Latn → khk_Cyrl  (tokenizer-ээс батлагдсан)

Энэ нь ЗӨВХӨН орчуулгын үе шат. Гаралтыг шууд сайтад тавихгүй:
    English → NLLB (энэ хэрэгсэл) → JETOUR редакцийн засвар → dict-mn → сайт

ТООН ӨГӨГДЛИЙГ ХАМГААЛАХ
------------------------
NLLB нь тоо, нэгж, товчлолыг гээх/өөрчлөх тохиолдол бий. Тиймээс анхдагчаар
`--protect` ажиллана: тоо-нэгж, товчлол, моделийн нэрийг орчуулахаас өмнө
сентинелээр сольж, дараа нь эгүүлж тавина. Ингэснээр тэдгээр нь БАЙТ ДАРААЛЛААР
хөндөгдөхгүй. Сентинел эвдэрсэн тохиолдолд `warnings` талбарт мэдэгдэнэ.

Хэрэглээ
--------
    python scripts/translate-en-mn.py "Wheelbase: 2720 mm"
    python scripts/translate-en-mn.py --file lines.txt --json
    echo "Smart Key" | python scripts/translate-en-mn.py

Модель нэг л удаа ачаална — олон мөрийг `--file`-аар нэг дуудалтад дамжуул.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

MODEL_ID = "Tsengel-mn/nllb-mongolian"
SRC_LANG = "eng_Latn"
TGT_LANG = "khk_Cyrl"  # халх монгол, кирилл

#: Орчуулахгүй хамгаалах хэсгүүд. Дараалал нь ЧУХАЛ — урт нь эхэлнэ.
PROTECT = [
    r"\d+(?:[.,]\d+)?\s?(?:mm|cm|m|km/h|km|kg|L/100km|L|kWh|kW|Nm|N·m|hp|Ps|dB|°|″|\"|inch|in\b|%)",
    r"\d+(?:[.,]\d+)?\s?(?:мм|см|км/ц|км|кг|л|кВт·ц|кВт|Нм|Н·м|м\.х\.?|дБ|инч)",
    r"\b\d+(?:\.\d+)?T\b",            # 1.5T, 2.0T
    r"\b\d+[A-Z]{2,}\b",              # 3DHT, 6DCT, 8AT
    r"\b[A-Z]{2,}(?:-[A-Z0-9]+)?\b",  # PHEV, AEB, BSD, RCTA, LDWS, XWD, LED, OS
    r"\b\d+(?:[.,]\d+)?\b",           # бусад бүх тоо
]
_PROTECT_RE = re.compile("|".join(f"(?:{p})" for p in PROTECT))

#: Сентинел — NLLB-ийн үг задлагчийг дайрахгүй, латин бус тэмдэггүй хэлбэр
def _sent(i: int) -> str:
    return f" QQ{i}ZZ "


def protect(text: str) -> tuple[str, list[str]]:
    spans: list[str] = []

    def sub(m: re.Match) -> str:
        spans.append(m.group(0))
        return _sent(len(spans) - 1)

    return _PROTECT_RE.sub(sub, text), spans


def restore(text: str, spans: list[str]) -> tuple[str, list[str]]:
    warn: list[str] = []
    for i, orig in enumerate(spans):
        pat = re.compile(rf"\s*QQ\s*{i}\s*ZZ\s*", re.I)
        if not pat.search(text):
            warn.append(f"сентинел {i} эвдэрсэн — «{orig}» эгүүлээгүй")
            continue
        text = pat.sub(f" {orig} ", text, count=1)
    return re.sub(r"\s{2,}", " ", text).strip(), warn


def load():
    import truststore  # системийн сертификат — HF-д хандах шаардлага гарвал
    truststore.inject_into_ssl()
    os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
    os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
    os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
    os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
    from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, logging as hf_logging

    hf_logging.set_verbosity_error()
    tok = AutoTokenizer.from_pretrained(MODEL_ID, src_lang=SRC_LANG, local_files_only=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID, local_files_only=True)
    model.eval()
    # `generation_config.max_length` (=200) нь `max_new_tokens`-тэй зөрчилдөж
    # сануулга гаргадаг тул салгав — бид шинэ токены хязгаараар удирдана.
    model.generation_config.max_length = None
    return tok, model


def bos_id(tok) -> int:
    """khk_Cyrl-ийн token id — transformers-ийн хувилбар хооронд өөр байдаг."""
    for getter in (
        lambda: tok.convert_tokens_to_ids(TGT_LANG),
        lambda: tok.lang_code_to_id[TGT_LANG],
        lambda: tok.get_vocab()[TGT_LANG],
    ):
        try:
            v = getter()
            if v is not None and v >= 0:
                return v
        except Exception:
            pass
    raise SystemExit(f"{TGT_LANG}-ийн token id олдсонгүй")


def translate(texts: list[str], *, use_protect: bool, beams: int):
    import torch

    tok, model = load()
    forced = bos_id(tok)
    out = []
    for src in texts:
        payload, spans = protect(src) if use_protect else (src, [])
        enc = tok(payload, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            gen = model.generate(
                **enc,
                forced_bos_token_id=forced,
                num_beams=beams,
                do_sample=False,           # детерминистик
                max_new_tokens=256,
                no_repeat_ngram_size=4,
            )
        raw = tok.batch_decode(gen, skip_special_tokens=True)[0]
        mn, warn = restore(raw, spans) if use_protect else (raw.strip(), [])
        out.append({"en": src, "mn": mn, "raw": raw, "protected": spans, "warnings": warn})
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="English → Mongolian (NLLB) орчуулгын ноорог")
    ap.add_argument("text", nargs="*", help="орчуулах англи текст")
    ap.add_argument("--file", help="мөр тутамд нэг текст бүхий файл")
    ap.add_argument("--json", action="store_true", help="машинд уншигдах гаралт")
    ap.add_argument("--no-protect", action="store_true", help="тоо/товчлолыг хамгаалахгүй")
    ap.add_argument("-b", "--beams", type=int, default=4)
    a = ap.parse_args()

    if a.file:
        texts = [l.strip() for l in open(a.file, encoding="utf-8") if l.strip()]
    elif a.text:
        texts = [" ".join(a.text)]
    else:
        texts = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not texts:
        raise SystemExit("орчуулах текст өгөөгүй")

    res = translate(texts, use_protect=not a.no_protect, beams=a.beams)

    if a.json:
        json.dump({"model": MODEL_ID, "src": SRC_LANG, "tgt": TGT_LANG, "items": res},
                  sys.stdout, ensure_ascii=False, indent=1)
        sys.stdout.write("\n")
    else:
        for r in res:
            print(f"EN: {r['en']}")
            print(f"MN: {r['mn']}")
            for w in r["warnings"]:
                print(f"    ! {w}", file=sys.stderr)
            print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
