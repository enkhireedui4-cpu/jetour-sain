// scripts/fullspecs-to-specgroups.mjs
//
// `fullSpecs` (хаана ч харагддаггүй байсан) → `specGroups` (нээгддэг блокт
// бүлэглэн харагдана). Ажиллуулах: node scripts/fullspecs-to-specgroups.mjs
//
// ЗАРЧИМ: мөр бүр `fullSpecs`-ээс ЯГ ТЭР утгаараа шилжинэ — шинэ үзүүлэлт
// зохиохгүй, тоо өөрчлөхгүй. Зөвхөн БҮЛЭГЛЭНЭ, мөн `dimensions`-ийг «Хэмжээ»
// бүлгийн нэг мөр болгоно.
//
// Шошго дээр нэгжийг ХОЁР ДАХИН бичихгүй: `fullSpecs`-д «Газраас тэнхлэг
// хүртэлх зай (мм)» = «210 мм» гэж давхардаж байсан. `specGroups`-ийн хэв нь
// шошго + нэгжтэй утга (жишээ «Тэнхлэг хоорондын зай» = «2800 мм») тул
// шошгоны «(мм)»-ийг авна.
import { PrismaClient } from "@prisma/client";

/** Загвар тус бүрийн бүлэг: [бүлгийн гарчиг, [fullSpecs-ийн шошгууд]] */
const GROUPS = {
  "x70-plus": [
    ["Хэмжээ", ["Биеийн урт", "Тэнхлэг хоорондын зай", "Газраас тэнхлэг хүртэлх зай (мм)", "Суудлын тоо"]],
    ["Хөдөлгүүр ба гүйцэтгэл", ["Хөдөлгүүр", "Хөдөлгүүрийн чадал", "Дээд зүтгэх хүч", "Хурдны хайрцаг", "Хөтлөгч тэнхлэг", "Дээд хурд", "Шатахуун"]],
    ["Тоноглол ба аюулгүй байдал", ["Панорам дээвэр", "Аюулгүйн дэр", "Хүүхдийн суудал"]],
  ],
  x50: [
    ["Хэмжээ", ["__dimensions__", "Тэнхлэг хоорондын зай", "Газраас тэнхлэг хүртэлх зай (мм)", "Тээшний хэсгийн багтаамж"]],
    ["Хөдөлгүүр ба гүйцэтгэл", ["Хөдөлгүүр", "Хөдөлгүүрийн чадал", "Дээд зүтгэх хүч", "Хурдны хайрцаг", "Хөтлөгч тэнхлэг", "Шатахууны систем", "Шатахууны сав"]],
    ["Тоноглол", ["Дугуй ба обудны хэмжээ"]],
  ],
  g700: [
    ["Хэмжээ", ["__dimensions__", "Газраас тэнхлэг хүртэлх зай (мм)", "Их биеийн бүтэц"]],
    ["Хөдөлгүүр ба гүйцэтгэл", ["Хөдөлгүүр / хурдны хайрцаг", "Хөдөлгүүрийн чадал", "Дээд зүтгэх хүч", "0–100 км/ц", "Хөтлөгч систем"]],
    ["Туулах чадвар", ["Нийт туулах зам (цахилгаан + бензин)", "Цэвэр цахилгаан туулах зай", "Ус туулах гүн"]],
  ],
};

/** Шошгоны төгсгөлийн нэгжийн хаалтыг авна — утга нь нэгжээ аль хэдийн агуулна */
const cleanLabel = (l) => l.replace(/\s*\((?:мм|см|л|кг)\)$/u, "");

const db = new PrismaClient();
try {
  for (const [id, groups] of Object.entries(GROUPS)) {
    const row = await db.carModel.findUnique({ where: { id } });
    if (!row) { console.log(`${id}: олдсонгүй`); continue; }
    const d = JSON.parse(row.detailsJson);
    if (!d.fullSpecs) { console.log(`${id}: fullSpecs байхгүй — өнгөрөв`); continue; }

    const byLabel = new Map((d.fullSpecs.rows ?? []).map((r) => [r.label, r.value]));
    const used = new Set();
    const dim = d.fullSpecs.dimensions;

    const specGroups = [];
    for (const [title, labels] of groups) {
      const rows = [];
      for (const label of labels) {
        if (label === "__dimensions__") {
          if (dim) rows.push({
            label: "Урт × өргөн × өндөр",
            value: `${dim.length} × ${dim.width} × ${dim.height}`.replace(/ мм(?= ×)/g, ""),
          });
          continue;
        }
        if (!byLabel.has(label)) { console.log(`  ⚠ ${id}: "${label}" fullSpecs-д байхгүй`); continue; }
        rows.push({ label: cleanLabel(label), value: byLabel.get(label) });
        used.add(label);
      }
      if (rows.length) specGroups.push({ title, rows });
    }

    // Бүлэгт ороогүй мөр үлдсэн бол хаяхгүй — сүүлийн бүлэгт нэмнэ
    const left = [...byLabel.keys()].filter((l) => !used.has(l));
    if (left.length) {
      console.log(`  ⚠ ${id}: бүлэглэгдээгүй ${left.length} мөрийг «Бусад»-д нэмэв: ${left.join(", ")}`);
      specGroups.push({ title: "Бусад", rows: left.map((l) => ({ label: cleanLabel(l), value: byLabel.get(l) })) });
    }

    const before = (d.fullSpecs.rows ?? []).length + (dim ? 1 : 0);
    const after = specGroups.reduce((n, g) => n + g.rows.length, 0);
    delete d.fullSpecs;
    d.specGroups = specGroups;

    const out = JSON.stringify(d);
    JSON.parse(out);
    await db.carModel.update({ where: { id }, data: { detailsJson: out } });
    console.log(`${id.padEnd(10)} ${before} мөр → ${specGroups.length} бүлэг / ${after} мөр` +
      (before === after ? "  ✓ бүтэн" : `  ⚠ ЗӨРҮҮ ${before - after}`));
    specGroups.forEach((g) => console.log(`    · ${g.title} (${g.rows.length})`));
  }
} finally {
  await db.$disconnect();
}
