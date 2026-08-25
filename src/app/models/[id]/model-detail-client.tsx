"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  FileText,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import type { CmsCarModel, ShowcaseSlide, VehicleVariant } from "@/lib/cms";
import { Gallery } from "@/components/jetour/gallery";
import { FeatureSlider, type FeatureItem } from "@/components/jetour/feature-slider";
import { TechnologyHighlights } from "@/components/jetour/technology-highlights";
import { colorTone, swatchGradient, SWATCH_INSET } from "@/lib/color-studio";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { BLUR_DATA_URL } from "@/lib/image";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { CinematicSlider, type CinematicSlide } from "@/components/jetour/cinematic-slider";
import { InteriorStory } from "@/components/jetour/interior-story";
import { PremiumFeatures } from "@/components/jetour/premium-features";
import { Spin360 } from "@/components/jetour/spin-360";
import { ModelSections } from "@/components/jetour/model-sections";
import { ModelSubnav } from "@/components/jetour/model-subnav";


export default function ModelDetailClient({ model }: { model: CmsCarModel }) {
  return <ModelDetailContent model={model} />;
}


function ModelDetailContent({ model }: { model: CmsCarModel }) {
  const d = model.details;
  // Бодит өнгөний зураг (Color Configurator)
  const colorImages = d.colorImages ?? [];
  const galleryImgs = d.galleryImages ?? [];
  const [colorIdx, setColorIdx] = useState(0);
  const activeColor = colorImages[colorIdx];
  const studioTone = colorTone(activeColor?.hex);

  // === Хөдөлгүүр/трим хувилбарууд (Бензин / Хайбрид / PHEV) ===
  const variants = d.variants ?? [];
  const firstAvailable = variants.findIndex((v) => (v.status ?? "available") === "available");
  const [variantIdx, setVariantIdx] = useState(firstAvailable === -1 ? 0 : firstAvailable);
  const activeVariant = variants[variantIdx];
  const showcase = d.showcase;
  const heroImg = showcase?.hero ?? colorImages[0]?.image ?? galleryImgs[0] ?? model.heroImage;
  // Техникийн үзүүлэлтийн зураг — hero-гоос тусад нь тавьж болно
  const specsImg = d.specsImage ?? heroImg;
  // Hero слайдер — detailsJson.heroSlides дээр 2+ зураг байвал гүйдэг слайдер болно.
  // heroSlidesMobile байвал утсанд 9:16 хувилбарыг тайралтгүй бүтнээр нь харуулна.
  const heroSlides = d.heroSlides ?? [];
  const heroSlidesMobile = d.heroSlidesMobile ?? [];
  /* `"fill"` — эх зураг дэлгэцээс өндөр харьцаатай (жишээ 9:19) үед кадрын
     харьцааны оронд дэлгэцийг бүтэн эзэлнэ. Тайралт бага, толгой хагас
     харагдахгүй. Бусад загварт (9:16) харьцаа хэвээрээ. */
  const heroMobileFill = d.heroMobileAspect === "fill";
  // CinematicSlider-ийн хэлбэрт хөрвүүлнэ (десктоп + утасны хос зураг).
  // Текст (headline/description/cta) өгөөгүй тул зураг цэвэр, бичиггүй харагдана.
  const heroCinematicSlides: CinematicSlide[] = useMemo(
    () => heroSlides.map((image, i) => ({ image, imageMobile: heroSlidesMobile[i] })),
    [heroSlides, heroSlidesMobile]
  );
  const exteriorImgs =
    d.exteriorImagesOverride ??
    (colorImages.length
      ? colorImages.map((c) => c.image)
      : galleryImgs.length
      ? galleryImgs
      : model.exteriorImages);
  const techHi = d.techHighlights ?? [];
  const safetyHi = d.safetyHighlights ?? [];
  const qualityHi = d.qualityHighlights ?? [];
  const interiorHi = d.interiorHighlights ?? [];
  /* Технологийн онцлох — байвал "Онцлох боломжууд" слайдерыг ОРЛУУЛНА */
  const techHighlightRows = d.technologyHighlights ?? [];
  /* 360° эргэлт — кадр байвал л гарна */
  const spin = d.spin360?.colors?.length ? d.spin360 : null;
  /* Нэмэлт хэсгүүд — шаблонд `slot`-оороо орно. Байхгүй загварт юу ч нэмэгдэхгүй. */
  const extraSections = d.sections ?? [];
  const afterExterior = extraSections.filter((s) => s.slot === "after-exterior");
  const afterInterior = extraSections.filter((s) => s.slot === "after-interior");
  /* "JETOUR X50" → "X50" — хэсгийн шошгод брэндийн нэрийг давхардуулахгүй */

  // === Үндсэн техникийн үзүүлэлт ===
  // Худалдан авагчид хамгийн хэрэгтэй 8 үзүүлэлт (model.specs-ээс — бүх загварт
  // байдаг талбарууд). Утга байхгүй бол мөр гарахгүй.
  const primarySpecs = (
    [
      { label: "Хөдөлгүүр", value: model.specs.engine },
      /* Нэршил нь АЛБАН ЁСНЫ БРОШЮРЫН "Техник үзүүлэлт" хүснэгтээр.
         Эталон нь X50-ийн брошюр (хамгийн дэлгэрэнгүй, бүрэн тоноглолын
         жагсаалттай). ТЭМДЭГЛЭЛ: T2 PHEV-ийн брошюр ижил үзүүлэлтийг өөрөөр
         нэрлэдэг ("Мушгих хүч", "Хөдөлгүүрийн хүчин чадал") — сайт нэг
         жигд байхын тулд X50-ийнхийг баримталсан.
           Power      → "Хөдөлгүүрийн чадал"
                        PHEV-д "Хосолсон системийн чадал" — тэр үзүүлэлт нь
                        хөдөлгүүр + цахилгаан моторын НИЙЛБЭР тул.
           Torque     → "Дээд зүтгэх хүч"
           Drivetrain → "Хөтлөгч тэнхлэг"
           Seats      → "Суудлын тоо"
           Clearance  → "Газраас тэнхлэг хүртэлх зай (мм)"
           Fuel       → "Шатахууны төрөл" */
      {
        label: /PHEV/i.test(model.specs.fuel) ? "Хосолсон системийн чадал" : "Хөдөлгүүрийн чадал",
        value: model.specs.power,
      },
      { label: "Дээд зүтгэх хүч", value: model.specs.torque },
      { label: "Хурдны хайрцаг", value: model.specs.transmission },
      { label: "Хөтлөгч тэнхлэг", value: model.specs.drivetrain },
      { label: "Суудлын тоо", value: model.specs.seats },
      { label: "Газраас тэнхлэг хүртэлх зай (мм)", value: model.specs.groundClearance },
      { label: "Шатахууны төрөл", value: model.specs.fuel },
    ] as { label: string; value?: string }[]
  ).filter((r): r is { label: string; value: string } => Boolean(r.value?.trim()));


  // === Өнгө сонгогчийн блокууд ===
  // Авсаархан (configurator) хувилбарт сонгогч ба өнгөний нэр нь зургийн ДЭЭР,
  // энгийн хувилбарт ДООР харагдана. Хоёр дахин бичихийн оронд хувьсагчид
  // гаргаж, DOM-ийн дараалал харагдах дараалалтай яг таарахаар зохион байгуулав.
  const compactPicker = d.colorPickerCompact === true;
  /* Өнгөний студийн дэлгэрэнгүй хувилбар (зүүнд үзүүлэлт, баруунд босоо нэр) */
  const studioPro = d.colorStudioPro === true;

  const colorPickerNode = (
    <div className="color-hall__picker" role="group" aria-label="Биеийн өнгө сонгох">
      {colorImages.map((c, i) => (
        <button
          key={c.name}
          type="button"
          onClick={() => setColorIdx(i)}
          title={c.name}
          aria-label={c.name}
          aria-pressed={colorIdx === i}
          className="color-hall__swatch"
          /* Инактив нүдэнд сонгогдсон байдлын шинжийг бичихгүй — тэгснээр
             CSS-ийн base ба :hover дүрэм хүчинтэй хэвээр байна. */
          style={
            compactPicker
              ? {
                  // Авсаархан: цэвэр нэг өнгө (градиентгүй). Сонгогдсоныг зөвхөн
                  // хос ринг илэрхийлнэ — дотор нимгэн цайвар, гадна 2px хар.
                  background: c.hex,
                  ...(colorIdx === i
                    ? {
                        boxShadow:
                          "inset 0 0 0 1.5px rgba(255,255,255,0.85), 0 0 0 2px #17181B",
                      }
                    : {}),
                }
              : {
                  background: swatchGradient(c.hex),
                  ...(colorIdx === i
                    ? {
                        borderColor: "#17181B",
                        transform: "scale(1.06)",
                        boxShadow: `${SWATCH_INSET}, 0 0 0 4px rgba(23,24,27,0.06), 0 2px 6px rgba(23,24,27,0.10)`,
                      }
                    : {}),
                }
          }
        />
      ))}
    </div>
  );

  // Сонгогдсон өнгөний нэр. key-ээр дахин mount болж 0.28s зөөлөн гарч ирнэ.
  const colorNameNode = (
    <p
      key={`sel-${activeColor?.name}`}
      className={
        compactPicker
          ? "color-hall__name color-hall__name--under"
          : "color-hall__name lg:hidden mt-3 text-center sm:text-left"
      }
    >
      {activeColor?.name}
    </p>
  );

  // Урьдчилсан захиалгатай загвар — CTA болон доод талын формын горим
  const preOrder = d.preOrder === true;
  const ctaLabel = preOrder ? "Урьдчилсан захиалга" : "Тест драйв захиалах";

  // "Онцлох боломжууд" — өмнөхтэй ижил өгөгдлийн эх сурвалж (tech + safety + quality).
  // Ялгаа нь: хуучин слайдер title-ыг л харуулж, caption-ыг хаядаг байсан;
  // шинэ слайдер хоёуланг нь ашиглана (шинэ агуулга зохиогоогүй).
  const featureItems: FeatureItem[] = [...techHi, ...safetyHi, ...qualityHi].filter(
    (h): h is FeatureItem => Boolean(h?.image && h?.title)
  );

  /* Наалдамхай дэд цэсний зангуу — хуудас юуг БОДИТООР рендерлэдэгтэй яг ижил
     нөхцлөөр тооцно. Загвар бүр өөр хэсэгтэй (T1-д `exterior`/`interior`
     байхгүй — тэдгээр нь ерөнхий `sections` бүтээгчээр гардаг); хатуу жагсаалт
     бичвэл байхгүй хэсэг рүү заасан эвдэрсэн холбоос үлдэнэ. */
  const subnavItems = useMemo(() => [
    colorImages.length > 0 && { id: "colors", label: "Өнгө" },
    // `showcase.exterior` нь ХООСОН МАССИВ бол хэсгийг зориуд хассан гэсэн үг
    !(showcase?.exterior && showcase.exterior.length === 0) && {
      id: "exterior",
      label: "Гадна",
    },
    /* Салон: аль ч салаа (PremiumFeatures / InteriorStory / слайдер /
       ердийн галерей) `id="interior"`-ыг өөрөө рендерлэдэг. Тиймээс зөвхөн
       ХООСОН МАССИВ буюу «зориуд хассан» тохиолдолд л зангуу байхгүй. */
    !(showcase?.interior && showcase.interior.length === 0) && {
      id: "interior",
      label: "Салон",
    },
    primarySpecs.length > 0 && { id: "specs", label: "Үзүүлэлт" },
  ].filter((x): x is { id: string; label: string } => Boolean(x)),
  [colorImages.length, showcase, primarySpecs.length]);

  return (
    /* `data-model` — загварт зориулсан ХАРАГДАЦЫН дүрмүүдийг тусгаарлана.
       Зан үйл (чирэлт, слайдын шилжилт) бүх загварт нийтлэг хэвээр; зөвхөн
       дүрслэл (жишээ T2-ын утасны зохиомж) ийм хамрах хүрээтэй болно. */
    <div
      id="main-content"
      data-model={model.id}
      className="min-h-screen bg-white text-[#17181B]"
    >
      {/* === Энгийн үндсэн цэс (kz маяг — хуудас солигдоход цэс өөрчлөгдөхгүй) === */}
      <Navbar />
      <ModelSubnav modelName={model.name} items={subnavItems} />
      <div className="h-16" />

      {/* === Vehicle Hero === */}
      {heroSlides.length > 0 ? (
        /* Slider — зургийг бүтнээрээ, цэвэр харуулна (текст/товч/gradient-гүй).
           Утасны 9:16 хувилбар байвал 9/16 харьцаагаар дэлгэц дүүрэн, тайралтгүй.
           Байхгүй бол хуучин 3/2 харьцаа (өргөн зургаас ~23% л тайрагдана).
           Нэг зурагтай ч энэ замаар — CinematicSlider count<2 үед autoplay/drag/
           сумыг өөрөө хаадаг тул зөвхөн цэвэр hero харагдана.

           Утсан дээр: 16:9 зураг 375px өргөнд ердөө ~250px өндөр болдог тул
           анхны дэлгэцийн 30% л дүүрч, нэр/үнэ/CTA нь хаана ч харагдахгүй
           байв. Одоо босоо зураг дэлгэцийг бүтэн эзэлж, танилцуулга нь
           түүн дээр давхарлана (`.vhero__overlay`). */
        <div className="vhero">
          <section
            /* `aspect-[9/16]` нь ХАМГААЛАЛТЫН үндсэн харьцаа: CSS ямар нэг
               шалтгаанаар ирээгүй ч зураг 0 өндөр болж алга болохгүй. Доорх
               `--vhero-ar` нь утсан дээр түүнийг загварын харьцаагаар дарна. */
            className={`vhero__stage relative overflow-hidden bg-[#17181B] aspect-[9/16] lg:aspect-auto lg:h-[calc(100svh-4rem)] lg:min-h-[520px]${
              heroMobileFill ? " vhero__stage--fill" : ""
            }`}
            /* Кадрын харьцааг ЗӨВХӨН утсанд хэрэглэнэ (CSS-ийн media query).
               Inline `aspect-ratio` нь `lg:aspect-auto`-г дардаг тул десктоп
               дээр өндрөөс өргөнөө гаргаж, зураг 525px болж хумигддаг байв.

               9:16 нь анхдагч; эх зураг өөр харьцаатай бол CMS-ээс өгнө
               (T2 — 4:5). Босоо зураг байхгүй бол 3:2. */
            style={
              {
                /* `fill` үед харьцаа хэрэглэхгүй (класс нь өндрийг өгнө) */
                "--vhero-ar": heroMobileFill
                  ? "9 / 16"
                  : heroSlidesMobile.length
                  ? (d.heroMobileAspect ?? "9 / 16")
                  : "3 / 2",
              } as React.CSSProperties
            }
          >
            <CinematicSlider slides={heroCinematicSlides} alt={model.name} priority />
            {/* Зураг дээр текст байхгүй ч хуудсанд H1 хэрэгтэй — SEO ба screen reader */}
            <h1 className="sr-only">{model.name}</h1>

            {/* Утасны танилцуулга — ЗУРГИЙН ДЭЭР (десктоптой ижил зарчим).
                Өмнө нь зургийн доор тусдаа хар панел байсан: тэр нь толгойг
                хоёр хар зурвас болгож, хуудсыг сунгаж, дэлгэцэнд багтахгүй
                байв. Одоо толгой нь нэг л блок — зураг + түүн дээрх текст. */}
            {/* Зураг дээрх цорын ганц давхарга: нэр ба тайлбар, дээд хэсэгт
                голлоно. Эх зурагт байсан англи бичгийн хэсгийг тайрч хассан
                тул тэр орон зайд өөрсдийн монгол гарчиг орно.
                Үнэ/товч зургийн дээр гарахгүй — доорх хэсгүүдэд байна. */}
            <div className="vhero__overlay lg:hidden">
              <p className="vhero__name">{model.name}</p>
              <p className="vhero__tagline">{model.tagline}</p>
            </div>

          </section>
        </div>
      ) : (
        <section className="relative h-[calc(100vh-4rem)] min-h-[520px] overflow-hidden bg-[#17181B]">
          {/* heroImageMobile байвал утсанд 9:16 босоо кадрыг, lg-ээс хойш өргөн
              hero-г харуулна. sizes-д нөгөө талын зургийг 1px гэж зарласнаар
              браузер далдалсан хувилбарыг бүтнээр татахгүй (hero LCP хамгаална). */}
          {d.heroImageMobile && (
            <Image
              src={d.heroImageMobile}
              alt={model.name}
              fill
              sizes="(min-width: 1024px) 1px, 100vw"
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="lg:hidden object-cover"
              /* Кадрын нарийвчлал (X70 Plus-д хэмжиж тааруулсан): зургийн улаан
                 бие 50.0–58.1% (төв 54.1%) хэсэгт байгааг пиксел анализаар
                 тогтоов. 1.12 томсголт + 5% дээш → машины төв ~49%, хоосон
                 тэнгэр/асфальт 6%-аар хасагдана.

                 `heroZoom: false` бол хэрэглэхгүй: аль хэдийн зөв кадарласан
                 зурагт томсголт нь машиныг тайрна. */
              style={
                d.heroZoom === false ? undefined : { transform: "scale(1.12) translateY(-5%)" }
              }
            />
          )}
          <Image
            src={heroImg}
            alt={model.name}
            fill
            sizes={d.heroImageMobile ? "(min-width: 1024px) 100vw, 1px" : "100vw"}
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            /* heroCover: фото маягийн hero — дэлгэц дүүрэн (хажуудаа хар зурвасгүй).
               Студийн цагаан дэвсгэртэй зураг дээр машин тайрагдахаас сэргийлж
               анхдагчаар contain хэвээр. */
            className={`${d.heroImageMobile ? "hidden lg:block " : ""}${
              d.heroCover ? "object-cover" : "object-contain"
            }`}
            /* Десктопын кадр: машины бие 39.3–64.4% (төв 51.9%). 1.10 томсголт +
               2.5% дээш → машин ~10% том, төв ~49%, хоосон тэнгэр/асфальт 5%-аар
               хасагдана. Зөвхөн cover (тайрдаг) горимд — contain дээр тайрах зай
               байхгүй тул хөндөхгүй. */
            style={
              d.heroCover && d.heroZoom !== false
                ? { transform: "scale(1.10) translateY(-2.5%)" }
                : undefined
            }
          />
          {/* Бараансуулах scrim — зөвхөн текст уншигдахад хэрэгтэй. Текст
              хасагдсан загварт CSS-ээр унтрааж, зураг тодрохоор болгоно. */}
          <div className="vhero-s__scrim absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Зөөлөн гэрлийн давхарга — анхдагчаар харагдахгүй, зөвхөн CSS-ээр
              нээсэн загварт (X50, утас) ажиллана. */}
          <div className="vhero-s__glow" aria-hidden />

          <div className="vhero-s__lede relative z-10 h-full flex items-end pb-14 px-6">
            <div style={{ width: "min(1280px, 94vw)", margin: "0 auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1
                  className="vhero-s__title font-extrabold tracking-tight text-white mb-7"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    lineHeight: 1.05,
                    textShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  }}
                >
                  {model.name}
                </h1>
                {/* CTA — авсаархан, тод typography. Цагаан нь үндсэн, тунгалаг нь
                    хоёрдогч (нарийн хүрээтэй, glassmorphism/сүүдэргүй).
                    min-h-[44px] нь хүрэлтийн хэмжээг баталгаажуулна. */}
                <div className="vhero-s__cta flex flex-wrap items-center gap-2.5">
                  <a
                    href="#request-info"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 sm:px-6 rounded-lg bg-white text-[#17181B] text-sm sm:text-[0.9375rem] font-bold tracking-tight transition-colors duration-200 hover:bg-[#E20A17] hover:text-white active:bg-[#C00813] active:text-white"
                  >
                    Хүсэлт илгээх
                  </a>
                  <a
                    href="#specs"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 sm:px-6 rounded-lg border border-white/55 text-white text-sm sm:text-[0.9375rem] font-semibold tracking-tight transition-colors duration-200 hover:bg-white/12 hover:border-white active:bg-white/20"
                  >
                    Үнийн жагсаалт
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* === Хөдөлгүүрийн хувилбар (Variants + Compare Variants) === */}
      {variants.length > 0 && (
        <section id="variants" className="bg-white section-pad-sm border-b border-[#E7E7EA] scroll-mt-16">
          <div className="container-page">
            <h2 className="type-h2 uppercase text-[#17181B] mb-8">Өөрт тохирохоо сонгоно уу</h2>

            {/* Сонголтын карт */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {variants.map((v, i) => {
                const active = i === variantIdx;
                const coming = (v.status ?? "available") === "coming-soon";
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    aria-pressed={active}
                    className={`text-left rounded-2xl border p-5 transition-colors ${
                      active ? "border-[#17181B] bg-[#F5F5F6]" : "border-[#E7E7EA] hover:border-[#17181B]/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-xs font-bold tracking-[0.12em] uppercase ${
                          active ? "text-[#E20A17]" : "text-[#6B7280]"
                        }`}
                      >
                        {v.powertrain}
                      </span>
                      {coming && (
                        <span className="text-[0.55rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-[#E20A17] text-white">
                          Тун удахгүй
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-lg text-[#17181B] leading-tight">{v.name}</p>
                    <p className="type-small mt-1">
                      {v.startingPrice ? `${v.startingPrice}-с эхлэн` : v.priceNote ?? "—"}
                    </p>
                  </button>
                );
              })}
            </div>

            {activeVariant?.tagline && (
              <p className="type-lead max-w-2xl mb-10">{activeVariant.tagline}</p>
            )}

            {/* Хувилбар харьцуулах */}
            {variants.length >= 2 && (
              <div className="overflow-x-auto rounded-2xl border border-[#E7E7EA]">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="border-b border-[#E7E7EA] bg-[#FAFAFB]">
                      <th className="text-left font-bold text-[#17181B] px-5 py-4">Үзүүлэлт</th>
                      {variants.map((v) => (
                        <th key={v.id} className="text-left px-5 py-4">
                          <span className="block font-bold text-[#17181B]">{v.powertrain}</span>
                          <span className="block text-xs font-normal text-[#6B7280]">{v.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      { label: "Үнэ", get: (v: VehicleVariant) => v.startingPrice ?? v.priceNote ?? "—" },
                      { label: "Хүчин чадал", get: (v: VehicleVariant) => v.specs?.power ?? "—" },
                      { label: "Эргэлтийн хүч", get: (v: VehicleVariant) => v.specs?.torque ?? "—" },
                      { label: "Хөдөлгүүр", get: (v: VehicleVariant) => v.specs?.engine ?? "—" },
                      { label: "Хурдны хайрцаг", get: (v: VehicleVariant) => v.specs?.transmission ?? "—" },
                      { label: "Хөтлөгч", get: (v: VehicleVariant) => v.specs?.drivetrain ?? "—" },
                    ]).map((row, ri) => (
                      <tr
                        key={row.label}
                        className={`border-b border-[#E7E7EA] last:border-0 ${ri % 2 ? "bg-[#FAFAFB]" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-[#54585F]">{row.label}</td>
                        {variants.map((v) => (
                          <td key={v.id} className="px-5 py-3.5 font-bold text-[#17181B]">
                            {row.get(v)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* === Өнгөний сонголт (студи) — colorTransparent=true үед.
             Дэвсгэр нь сонгосон будгаар бүтэн дүүрсэн диагональ градиент болж
             зөөлөн солигдоно; текст/ring нь дэвсгэрийн гэрэлтүүлгээс хамаарч
             цагаан ↔ ink болж эргэнэ. Ард нь том сүүдэрлэсэн англи үг,
             зүүн талд босоо swatch, машин голдоо (зургууд crossfade). === */}
      {colorImages.length > 0 && d.colorTransparent && (
        <section
          id="colors"
          className={`color-studio${studioPro ? " color-studio--pro" : ""} scroll-mt-16`}
          style={
            {
              background: studioTone.background,
              "--cs-ink": studioTone.ink,
              "--cs-muted": studioTone.muted,
              "--cs-ring": studioTone.ring,
              "--cs-swatch-line": studioTone.swatchLine,
            } as React.CSSProperties
          }
        >
          <div className="color-studio__inner">
            {/* Дээд зүүн: жижиг хэсгийн шошго, доор нь сонгосон өнгөний нэр.
                Арын том watermark-ийг авав — дизайныг хүндрүүлж байсан. */}
            <h2
              className="section-title-lg color-studio__eyebrow"
              style={{ color: studioTone.ink }}
            >
              Өнгөний сонголт
            </h2>

            <div className="color-studio__row">
              {/* Зүүн багана: гурван гол үзүүлэлт, нимгэн зураастай.
                  Албан ёсны конфигураторын зохиомж — машиныг харангаа
                  хамгийн чухал тоог зэрэг харна. */}
              {studioPro && model.highlights.length > 0 && (
                <dl className="color-studio__figures">
                  {model.highlights.slice(0, 3).map((h) => (
                    <div key={h.label} className="color-studio__figure">
                      <dt className="color-studio__figure-label">{h.label}</dt>
                      <dd className="color-studio__figure-value">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="color-studio__swatches">
                {colorImages.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    aria-pressed={colorIdx === i}
                    title={c.name}
                    /* Товч нь ≥40px хүрэлцэх талбай; харагдах цэг нь дотроо
                       26px. Сонгогдсоныг цэгээс зайтай нимгэн ring илэрхийлнэ
                       (outline тул зай эзлэхгүй — layout хөдлөхгүй). */
                    className="color-studio__swatch"
                  >
                    <span
                      className="color-studio__dot"
                      style={{
                        background: c.hex,
                        borderColor: studioTone.swatchLine,
                        outlineColor: colorIdx === i ? studioTone.ring : "transparent",
                      }}
                    />
                    <span
                      className="color-studio__name"
                      style={{ color: colorIdx === i ? studioTone.ink : studioTone.muted }}
                    >
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="color-studio__stage">
                {colorImages.map((c, i) => (
                  <Image
                    key={c.image}
                    src={c.image}
                    alt={`${model.name} — ${c.name}`}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    /* Бүх өнгийг урьдчилан татна: opacity:0 зургийг браузер lazy-гээр
                       татдаггүй тул өнгө дарахад хоосон харагдах эрсдэлтэй байв.
                       Эхнийх priority, бусад eager (hall хувилбартай ижил зан). */
                    loading={i === 0 ? undefined : "eager"}
                    /* cover — тунгалаг PNG-ийн дээд/доод хоосон зайг тайрч
                       машиныг stage-ийн өргөнөөр бүтэн эзлүүлнэ. */
                    className="object-cover"
                    style={{
                      opacity: colorIdx === i ? 1 : 0,
                      transition: "opacity 0.5s ease-out",
                    }}
                    aria-hidden={colorIdx !== i}
                  />
                ))}
              </div>

              {/* Баруун зах дагуу босоо өнгөний нэр (эталон конфигураторын
                  тэмдэг). Swatch-ийн доор ижил нэр байгаа тул дэлгэц
                  уншигчид давхардуулахгүй — зөвхөн харааны элемент. */}
              {studioPro && activeColor && (
                <p className="color-studio__vname" aria-hidden>
                  {activeColor.name}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* === 360° конфигуратор ===
             "Гадна үзэмж"-ийн ӨМНӨ байрлана: хэрэглэгч эхлээд машиныг өөрөө
             эргүүлж, өнгийг нь сонгож "танилцаад", дараа нь бэлтгэсэн
             editorial зургуудыг үзэх нь илүү жамаараа. === */}
      {spin && (
        <section id="configurator" className="scroll-mt-16">
          <Spin360
            colors={spin.colors}
            alt={model.name}
            heading={spin.title ?? "Гадна төрх"}
            headingEn={spin.titleEn}
            startFrame={spin.startFrame ?? 0}
          />
        </section>
      )}

      {/* === Гадна үзэмж — premium editorial showcase.
             Шошго дээд зүүн, тайлбар доод зүүн, контрол доод баруун. === */}
      {/* `showcase.exterior` нь ХООСОН МАССИВ бол — хэсгийг зориуд хасна
          (жишээ нь X1: гадна талыг `sections` дахь spread/strip өгүүлнэ).
          `showcase` өөрөө байхгүй бол л ердийн галерейд унана. */}
      {showcase?.exterior?.length ? (
        <section id="exterior" className="scroll-mt-16">
          <ShowcaseSlider
            key={`ext-${model.id}`}
            slides={showcase.exterior}
            alt={model.name}
            title={d.showcaseTitles?.exterior ?? "Гадна үзэмж"}
            subtitle={d.showcaseSubtitles?.exterior}
            editorial
          />
        </section>
      ) : showcase?.exterior ? null : (
        <section id="exterior" className="showcase-section bg-white">
          <div className="container-page showcase-head">
            <h2 className="showcase-head__title">Гадна үзэмж</h2>
          </div>
          <div className="container-page">
            <Gallery
              key={`ext-${model.id}`}
              images={exteriorImgs}
              alt={model.name}
              accent={model.accent}
            />
          </div>
        </section>
      )}

      {/* Гадна үзэмжийн ДАРАА орох нэмэлт хэсгүүд (жишээ нь нарийн
          дэлгэрэнгүй — гэрэл / түлхүүр / бариул, дараа нь орон зай). */}
      {afterExterior.length > 0 && (
        <ModelSections sections={afterExterior} alt={model.name} />
      )}

      {/* === Дотор салон ===
             1) premiumFeatures байвал — кинематик "Premium Features" карусель
             2) interiorStory байвал — 4 зургийн editorial story
             3) эсвэл interiorEditorial=true үед "Гадна үзэмж"-тэй ижил editorial
             4) `showcase.interior` нь ХООСОН МАССИВ бол — хэсгийг зориуд хасна
                (T1: салоныг `sections` дахь index блок өгүүлнэ)
             5) эс бөгөөс хуучин overlay гарчигтай слайдер === */}
      {d.premiumFeatures?.features?.length ? (
        <PremiumFeatures
          key={`pf-${model.id}`}
          eyebrow={d.premiumFeatures.eyebrow}
          title={d.premiumFeatures.title}
          subtitle={d.premiumFeatures.subtitle}
          features={d.premiumFeatures.features}
        />
      ) : d.interiorStory?.features?.length ? (
        <InteriorStory
          key={`int-story-${model.id}`}
          title={d.interiorStory.title}
          lead={d.interiorStory.lead}
          features={d.interiorStory.features}
        />
      ) : showcase?.interior?.length ? (
        <section
          id="interior"
          className={
            d.interiorEditorial
              ? "scroll-mt-16"
              : "showcase-section showcase-section--bleed bg-[#F5F5F6]"
          }
        >
          <ShowcaseSlider
            key={`int-${model.id}`}
            slides={showcase.interior}
            alt={model.name}
            title={d.showcaseTitles?.interior ?? "Дотор салон"}
            subtitle={d.showcaseSubtitles?.interior}
            editorial={d.interiorEditorial}
          />
        </section>
      ) : showcase?.interior ? null : (
      <section id="interior" className="showcase-section bg-[#F5F5F6]">
        <div className="container-page showcase-head">
          <h2 className="showcase-head__title">Дотор салон</h2>
        </div>
        {interiorHi.length > 0 ? (
          <div className="container-page">
            <MediaHighlights items={interiorHi} />
          </div>
        ) : (
          <div className="container-page grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#E7E7EA]">
              <Image
                src={model.interiorImages[0]}
                alt={`${model.name} — салон`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[#54585F] text-base leading-relaxed mb-7 max-w-lg">
                {model.shortDesc}
              </p>
              <div className="space-y-5">
                {model.interiorFeatures.map((f) => (
                  <div key={f.title} className="border-l-2 border-[#E20A17] pl-4">
                    <h3 className="font-bold text-base text-[#17181B] mb-1">{f.title}</h3>
                    <p className="text-sm text-[#54585F] leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      )}

      {/* Салоны ДАРАА орох нэмэлт хэсгүүд (тав тухын шийдэл, хүчин чадал,
          аюулгүй байдал). */}
      {afterInterior.length > 0 && (
        <ModelSections sections={afterInterior} alt={model.name} />
      )}

      {/* === Бичлэг — "Дотор салон"-ы дараа. Дарж тоглуулна. === */}
      {d.video?.src && (
        <VideoBlock
          src={d.video.src}
          poster={d.video.poster ?? heroImg}
          title={d.video.title}
          caption={d.video.caption}
        />
      )}

      {/* === Өнгөний сонголт (360 hall маяг) — colorTransparent биш загварт.
             Том машин төвд, өнгөний цэгүүд яг доор нь. X70 Plus-аас бусад
             загварын өнгөний зураг нь дэвсгэртэй фото тул энэ хэлбэр илүү зохимжтой. === */}
      {colorImages.length > 0 && !d.colorTransparent && (
        <section
          id="colors"
          className={`color-hall${
            d.colorPickerCompact ? " color-hall--compact" : ""
          } scroll-mt-16`}
        >
          {/* Watermark — англи нэр байвал. Маш бага контраст (4%), машины ард.
              Авсаархан хувилбарт зураг доор шилжсэн тул watermark нь зургийн ард
              бүрэн нуугдана — харагдахгүй элемент үүсгэхгүйн тулд орхино. */}
          {activeColor?.en && !compactPicker && (
            <p className="color-hall__word" aria-hidden>
              {activeColor.en}
            </p>
          )}

          <div className="color-hall__inner">
            {/* Editorial гарчиг. Авсаархан хувилбарт загварын нэр эхний мөрөнд —
                hero дээр аль хэдийн H1 байгаа тул энд гарчиг биш (SEO давхардахгүй). */}
            {compactPicker && <p className="color-hall__model">{model.name}</p>}
            <h2 className="color-hall__eyebrow">Өнгөний сонголт</h2>
            {!compactPicker && (
              <p key={activeColor.name} className="color-hall__name hidden lg:block">
                {activeColor.name}
              </p>
            )}

            {/* Авсаархан (configurator): сонгогч ба өнгөний нэр зургийн ДЭЭР —
                гарчиг → сонгогч → нэр → машин гэсэн шатлал. */}
            {compactPicker && (
              <>
                {colorPickerNode}
                {colorNameNode}
              </>
            )}

            {/* Машин — хэсгийн гол. Өнгөний зургууд дээр дээрээ хэвтэж, зөвхөн
                opacity-гоор crossfade болно: зураг солигдож байгаа биш, будаг л
                өнгөө сольж байгаа мэт. Хэмжээ, байрлал, baseline хөдлөхгүй. */}
            <div className="color-hall__stage">
              {colorImages.map((c, i) => (
                <Image
                  key={c.image}
                  src={c.image}
                  alt={`${model.name} — ${c.name}`}
                  fill
                  sizes="(max-width: 1360px) 94vw, 1280px"
                  priority={i === 0}
                  /* Бүх өнгийг урьдчилан татна — эс тэгвээс өнгө дарахад зураг
                     ачаалагдаж амжаагүй хоосон харагдана (opacity:0 зургийг браузер
                     lazy-гээр татдаггүй). Эхнийх нь priority, бусад нь eager. */
                  loading={i === 0 ? undefined : "eager"}
                  className="object-cover rounded-2xl shadow-[0_24px_50px_-32px_rgba(23,24,27,0.22)]"
                  /* opacity-г Tailwind класс биш inline style-аар — next/image өөрөө
                     ачаалагдах хүртэл inline opacity тавьдаг тул класс дийлэгддэг. */
                  style={{
                    opacity: colorIdx === i ? 1 : 0,
                    // Авсаархан хувилбарт өнгө солих нь илүү шууд мэдрэгдэх 240мс;
                    // энгийн хувилбарт өмнөх 420мс хэвээр.
                    transition: compactPicker
                      ? "opacity 0.24s ease-out"
                      : "opacity 0.42s ease-out",
                  }}
                  aria-hidden={colorIdx !== i}
                />
              ))}
            </div>

            {/* Энгийн хувилбарт сонгогч ба нэр зургийн ДООР (өмнөх зохиомж). */}
            {!compactPicker && (
              <>
                {colorPickerNode}
                {colorNameNode}
              </>
            )}
          </div>
        </section>
      )}

      {/* === Технологийн онцлох ===
             `technologyHighlights` бүхий загварт "Онцлох боломжууд" слайдерын
             ОРОНД энэ тайван editorial блок гарна — ингэснээр нэг агуулга
             хоёр хэсэгт давхардахгүй. Бусад загварт слайдер хэвээр. === */}
      {techHighlightRows.length > 0 ? (
        <TechnologyHighlights
          title="Технологи"
          aspect={d.technologyAspect}
          items={techHighlightRows}
        />
      ) : (
        featureItems.length > 0 && (
          <FeatureSlider
            key={`hi-${model.id}`}
            items={featureItems}
            alt={model.name}
            heading="Онцлох боломжууд"
          />
        )
      )}

      {/* === Үндсэн техникийн үзүүлэлт ===
             Зөвхөн худалдан авагчид хамгийн хэрэгтэй 8 үзүүлэлт: хөдөлгүүр, чадал,
             эргэлтийн хүч, хурдны хайрцаг, хөтлөгч, суудал, тэнхлэгийн зай, түлш.
             Нэршил нь JETOUR-ын албан ёсны техникийн брошюрын дагуу.
             Бүрэн жагсаалт нь "Дэлгэрэнгүй үзүүлэлт"-д хураагдаж, брошюрт байна.
             · Desktop — зүүн талд зураг, баруун талд 2×4 тор.
             · Mobile — зураг → 2 багана тор → CTA (тусад нь эрэмбэлсэн). === */}
      {primarySpecs.length > 0 && (
        <section id="specs" className="py-10 lg:py-14 bg-white scroll-mt-16 overflow-hidden">
          <div className="container-page">
            {/* Толгой — жижиг eyebrow + албан ёсны гарчиг */}
            <div className="mb-6 lg:mb-8">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#696F79] mb-2">
                {model.name}
              </p>
              <h2 className="font-extrabold tracking-[-0.02em] leading-[1.1] text-[#17181B] text-[clamp(24px,2.6vw,36px)]">
                Үндсэн техникийн үзүүлэлт
              </h2>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 lg:gap-12 items-center">
              {/* Зураг */}
              {/* Утсанд 2:1 — 46px намхан, машин бүтэн хэвээр */}
              <div className="relative aspect-[2/1] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAFAFB] border border-[#E7E7EA]">
                <Image
                  src={specsImg}
                  alt={model.name}
                  fill
                  sizes="(max-width: 1024px) 94vw, 46vw"
                  className="object-cover"
                />
              </div>

              {/* 2×4 тор — hairline тусгаарлагчтай, хайрцаггүй */}
              <dl className="spec-grid grid grid-cols-2 gap-x-4 gap-y-0 lg:gap-x-8">
                {primarySpecs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`py-3 lg:py-4 border-[#E7E7EA] ${
                      i > 1 ? "border-t" : ""
                    } ${i % 2 === 1 ? "pl-4 lg:pl-8 border-l" : ""}`}
                  >
                    <dt className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#696F79] leading-tight">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 font-bold text-[#17181B] text-[clamp(15px,1.35vw,19px)] leading-snug tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Дэлгэрэнгүй үзүүлэлт — БҮЛЭГЛЭСЭН, нам гүм нээгддэг блок.
                Брошюр байхгүй загварт (жишээ T1 PHEV) эх сурвалжаас
                баталгаажсан үзүүлэлтүүд хаягдахгүй байх зам. `specGroups`
                байхгүй загварт юу ч гарахгүй. */}
            {d.specGroups?.length ? (
              <details className="specgrp mt-6 border-t border-[#E7E7EA] pt-4">
                <summary className="specgrp__sum">
                  <span>Дэлгэрэнгүй үзүүлэлт</span>
                  <ChevronDown className="specgrp__chev w-4 h-4" aria-hidden />
                </summary>
                <div className="specgrp__body">
                  {d.specGroups.map((g) => (
                    <section key={g.title} className="specgrp__group">
                      <h3 className="specgrp__title">{g.title}</h3>
                      <dl className="specgrp__rows">
                        {g.rows.map((r) => (
                          <div key={r.label} className="specgrp__row">
                            <dt>{r.label}</dt>
                            <dd>{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              </details>
            ) : null}

            {/* Үнэ + CTA — тодорхой шатлал: улаан → тунгалаг → нам гүм линк.
                Брошюрын ӨМНӨ байрлана: шийдвэр гаргах үйлдэл (тест драйв,
                мэдээлэл авах) эхэнд, лавлах материал нь араас. */}
            <div className="mt-6 lg:mt-8 pt-5 border-t border-[#E7E7EA] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              {(model.startingPrice ?? model.price ?? model.priceNote) && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#696F79] mb-1.5">
                    Үндсэн үнэ
                  </p>
                  <p className="font-extrabold text-[clamp(22px,2.2vw,30px)] leading-none tracking-tight text-[#17181B] tabular-nums">
                    {model.startingPrice ?? model.price ?? model.priceNote}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:shrink-0">
                <a
                  href="#request-info"
                  className="btn-electric-jetour inline-flex items-center justify-center min-h-[46px] px-6 rounded-xl text-sm font-bold whitespace-nowrap"
                >
                  {ctaLabel}
                </a>
                <a
                  href={CONTACT.phone1Href}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-xl border border-[#D9DADE] text-[#17181B] text-sm font-semibold whitespace-nowrap transition-colors hover:border-[#17181B] hover:bg-[#F5F5F6]"
                >
                  Мэдээлэл авах
                </a>
              </div>
            </div>

            {/* Брошюр — тусдаа зогсох мөр, блокийн ХАМГИЙН СҮҮЛД.
                Өмнө нь үзүүлэлтийн доор жижиг холбоос болж шигдсэн байв;
                jetouregypt-ийн хэв нь брошюрыг агуулгын төгсгөлд бие даасан
                товч болгодог — уншсаны дараа авах материал гэсэн дараалал.

                `download` атрибут ЗОРИУДААР байхгүй: түүнтэй бол хөтөч файлыг
                шууд диск рүү татдаг тул хэрэглэгч эхлээд харах боломжгүй.
                Түүнгүйгээр PDF нь шинэ табд нээгдэж, хүсвэл тэндээсээ татна. */}
            {d.brochure && (
              <a
                href={d.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center justify-between gap-4 rounded-xl border border-[#E7E7EA] px-5 py-4 transition-colors hover:border-[#17181B] hover:bg-[#FAFAFB]"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-[#D9DADE] shrink-0 text-[#54585F] transition-colors group-hover:border-[#17181B] group-hover:text-[#17181B]">
                    <FileText className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#17181B]">Брошюр</span>
                    <span className="text-[12px] text-[#6B7280] truncate">
                      PDF · бүрэн техникийн үзүүлэлт
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#A9ADB2] shrink-0 transition-colors group-hover:text-[#17181B]" />
              </a>
            )}
          </div>
        </section>
      )}

      {/* === Request Information Form === */}
      <section id="request-info" className="section-pad bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="container-page">
          {/* Зөвхөн форм: гарчиг/тайлбар/утасны товчийн блок хасагдсан.
              Холбоо барих зам хаагдаагүй — дугаарууд нь хөвөгч товчинд ба
              хөл хэсэгт, форм өөрөө нэг үйлдлээр хүсэлт хүлээн авна. */}
          <div className="mx-auto w-full max-w-[720px]">
            {preOrder ? (
              /* Урьдчилсан захиалга — зөвхөн нэр, утас (хамгийн богино зам) */
              <EnhancedLeadForm
                type="info-request"
                variant="white"
                title="Захиалгын хүсэлт"
                subtitle=""
                modelName={model.name}
                showModelField={false}
                showBranchField={false}
                showDateField={false}
                showTimeField={false}
                showContactMethod={false}
                showEmailField={false}
                showMessageField={false}
                submitLabel="Захиалга илгээх"
              />
            ) : (
              <EnhancedLeadForm
                type="test-drive"
                variant="white"
                title="JETOUR-ийн талаар дэлгэрэнгүй мэдээлэл авах"
                subtitle={`${model.name} — мэдээлэл авах, тест драйв`}
                modelName={activeVariant ? `${model.name} (${activeVariant.powertrain})` : model.name}
                showModelField
                /* Салбар, огноо, харилцах хэрэгсэл — хасав. Энэ форм нь мэдээлэл
                   авах/тест драйвын анхны хүсэлт тул нэр, утас, загвар, зурвас
                   хангалттай; цаг/салбарыг оператор дуудахдаа тохирно.
                   (Тест драйв, засвар захиалгын формуудад эдгээр хэвээр.) */
                showBranchField={false}
                showDateField={false}
                showTimeField={false}
                showContactMethod={false}
                showEmailField={false}
                showMessageField
                submitLabel="Хүсэлт илгээх"
              />
            )}
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
}

function Section({
  title,
  bg,
  dark = false,
  id,
  children,
}: {
  title: string;
  bg: string;
  dark?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`section-pad ${bg} overflow-hidden scroll-mt-16`}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className={`type-h2 uppercase ${dark ? "text-white" : "text-[#17181B]"}`}>
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function MediaHighlights({ items }: { items: { image: string; title: string; caption: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F6] border border-[#E7E7EA] mb-4">
            <Image
              src={it.image}
              alt={it.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <h3 className="font-bold text-lg text-[#17181B] mb-1.5">{it.title}</h3>
          <p className="text-[#54585F] text-sm leading-relaxed">{it.caption}</p>
        </motion.div>
      ))}
    </div>
  );
}


/**
 * Загварын хуудасны hero слайдер — 6 сек тутам автоматаар гүйнэ.
 * Мобайлд шудрах (swipe), desktop-д сум ба hover-ээр удирдана.
 * Индикаторын товших талбай 44px (харагдах зурвас нь 4px хэвээр).
 */
/**
 * Бичлэгийн блок — дарах хүртэл файл татагдахгүй (`preload="none"`), тиймээс
 * хуудасны хүндрэлд нөлөөлөхгүй. Дарсны дараа дуутайгаа, хяналттай тоглоно.
 */
function VideoBlock({
  src,
  poster,
  title,
  caption,
}: {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  const reduce = useReducedMotion();
  /** prefers-reduced-motion нь сервер дээр мэдэгдэхгүй тул hydration хүртэл салаалахгүй */
  const hydrated = useIsHydrated();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  /** Хөдөлгөөн мэдрэмтгий хэрэглэгчид — автоматаар тоглуулахгүй, товч үзүүлнэ */
  const [manualStarted, setManualStarted] = useState(false);

  /**
   * Дэлгэцэнд орж ирэхэд дуугүйгээр автоматаар тоглоно, гарахад зогсоно.
   * rootMargin-аар бага зэрэг эрт (200px) ачаалж эхэлдэг тул харагдах үед
   * аль хэдийн бэлэн байна. preload="none" — доош гүйхгүй хүн юу ч татахгүй.
   */
  const inView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    // Далд таб дээр Chrome дуугүй бичлэгийг зогсоодог тул таб эргэж
    // харагдахад дахин оролдоно (эс тэгвээс хөшсөн фрэйм үлдэнэ).
    const tryPlay = () => {
      if (inView.current && !document.hidden) el.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    io.observe(el);
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [reduce]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  const startManually = () => {
    setManualStarted(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  const showPlayButton = hydrated && reduce && !manualStarted;

  return (
    <section id="video" className="bg-[#0E0E10] scroll-mt-16">
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          muted={muted}
          loop
          // Дуу нээсэн үед л native хяналт — тэгэхгүй бол цэвэр, ambient
          controls={!muted}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Гарчиг — доод давхарга дээр, уншигдахуйц градиенттай */}
        {(title || caption) && (
          <div className="absolute inset-x-0 bottom-0 pointer-events-none">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative px-6 lg:px-10 pb-8 lg:pb-10 max-w-xl">
              {title && (
                <p
                  className="text-white font-bold text-lg lg:text-2xl"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
                >
                  {title}
                </p>
              )}
              {caption && (
                <p
                  className="text-white/80 text-sm lg:text-base mt-1"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
                >
                  {caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Дуу нээх / хаах */}
        {!showPlayButton && (
          <button
            onClick={toggleSound}
            aria-label={muted ? "Дуу нээх" : "Дуу хаах"}
            className="absolute top-5 right-5 lg:top-6 lg:right-6 z-10 grid place-items-center w-11 h-11 rounded-full bg-black/35 border border-white/25 backdrop-blur-sm text-white hover:bg-white hover:text-[#17181B] transition-colors"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}

        {/* Хөдөлгөөн мэдрэмтгий хэрэглэгчид — гараар тоглуулах */}
        {showPlayButton && (
          <>
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
            <button
              onClick={startManually}
              aria-label={title ? `${title} — бичлэг тоглуулах` : "Бичлэг тоглуулах"}
              className="absolute inset-0 grid place-items-center group"
            >
              <span className="grid place-items-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 border border-white/50 backdrop-blur-sm text-white transition-all group-hover:bg-white group-hover:text-[#17181B] group-hover:scale-105">
                <Play className="w-7 h-7 lg:w-8 lg:h-8 ml-0.5" />
              </span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Дэлгэц дүүрэн слайдерын зураг. srcMobile (9:16) байвал утсанд түүнийг,
 * lg-ээс дээш дэлгэцэд өргөн (16:9) хувилбарыг харуулна — хоёулаа object-cover
 * тул харьцаа нь хайрцагтайгаа таарч, зураг тайрагдахгүй.
 */
function ResponsiveSlideImage({
  src,
  srcMobile,
  alt,
  priority,
  containMobile,
}: {
  src: string;
  srcMobile?: string;
  alt: string;
  priority?: boolean;
  /**
   * Слайдер 9:16 хайрцагтай атал энэ слайдад утасны хувилбар байхгүй үед true.
   * Ийм үед `object-contain` — өргөн зураг тайрагдалгүй бүтнээрээ багтана
   * (дээр/доор нь харанхуй зай үлдэнэ, дэвсгэртэй нийлнэ).
   */
  containMobile?: boolean;
}) {
  // alt-ыг spread дотор биш, тус тусад нь бичнэ — a11y linter spread-ийг тандаж
  // чаддаггүй тул ингэснээр "alt байхгүй" гэсэн хуурамч дуудлага гарахгүй.
  const common = {
    fill: true as const,
    sizes: "100vw",
    placeholder: "blur" as const,
    blurDataURL: BLUR_DATA_URL,
  };

  if (!srcMobile) {
    return (
      <Image
        src={src}
        alt={alt}
        {...common}
        priority={priority}
        className={containMobile ? "object-contain lg:object-cover" : "object-cover"}
      />
    );
  }

  // Хоёр хувилбар — CSS-ээр нэг нь л харагдана. Далдалсан нь lazy тул браузер
  // татахгүй; зөвхөн эхний слайд (priority) хоёуланг татна (~30 KB илүү).
  return (
    <>
      <Image
        src={srcMobile}
        alt={alt}
        {...common}
        priority={priority}
        className="lg:hidden object-cover"
      />
      <Image
        src={src}
        alt={alt}
        {...common}
        priority={priority}
        className="hidden lg:block object-cover"
      />
    </>
  );
}

/**
 * Дэлгэц дүүрэн, гүйж (translateX) солигддог том слайдер — global сайтын маяг.
 * Сум дарахад дараагийн зураг урсаж орж ирнэ; 5 сек тутам автоматаар солигдоно.
 */
function ShowcaseSlider({
  slides,
  alt,
  title,
  subtitle,
  editorial,
}: {
  slides: ShowcaseSlide[];
  alt: string;
  /** Хэсгийн гарчиг — зургийн дээр давхарлан гарна (зургийг жижигрүүлэхгүй) */
  title?: string;
  /** Гарчгийн доорх нэг мөр тайлбар (заавал биш) */
  subtitle?: string;
  /**
   * Premium editorial зохиомж: жижиг хэсгийн шошго (дээд зүүн), тайлбар
   * (доод зүүн), нарийн сум + "01 / 04" тоолуур ба прогресс (доод баруун).
   * Анхдагчаар унтраалттай — бусад хэсэг/загварын харагдац хэвээрээ үлдэнэ.
   */
  editorial?: boolean;
}) {
  /** Одоогийн ба өмнөх слайд — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;
  const [paused, setPaused] = useState(false);

  const step = useCallback(
    (dir: 1 | -1) =>
      setNav((s) => ({
        active: (s.active + dir + slides.length) % slides.length,
        from: s.active,
      })),
    [slides.length]
  );
  const goTo = useCallback((i: number) => setNav((s) => ({ active: i, from: s.active })), []);
  const next = useCallback(() => step(1), [step]);
  const prev = () => step(-1);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, slides.length, active]);

  /**
   * Чирэх явцын хэвтээ шилжилт (px).
   *
   * Зөвхөн гараа авахад солигддог байсныг өөрчилсөн: одоо слайд хуруу дагаж
   * хөдөлж, ХОЁР слайд зэрэг харагдана — дараа нь юу ирэхийг хэрэглэгч урьдчилж
   * хардаг. Чирэлт дуусахад 0 болж, CSS шилжилт нь байрандаа зөөлөн бэхлэнэ.
   */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    threshold: 60,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    /* Эсэргүүцэл НЭМЭХГҮЙ: слайдер нь дугуй (`(p + 1) % slides.length`) тул
       сүүлчийн слайдаас цааш чирэхэд эхлэл рүү эргэлддэг — "цаашид юу ч алга"
       гэсэн мэдрэмж өгвөл худал болно. */
    onMove: setDragDx,
  });

  // Утасны 9:16 хувилбартай бол утсанд 9/16 харьцаагаар бүтнээр нь харуулна
  const hasMobile = slides.some((s) => s.imageMobile);

  /**
   * Утасны хайрцгийн харьцаа:
   *  • 9:16 хувилбар байвал `9/16` — зураг бүтнээрээ, дэлгэц дүүрэн.
   *  • Байхгүй бол `16/9` — өргөн зургийг тайралтгүй бүтнээр харуулна
   *    (өмнө нь өндөр хайрцагт хийж, өргөнөөс ~70% тайрдаг байсан).
   * lg-ээс дээш аль ч тохиолдолд дэлгэц дүүрэн өндөр.
   */

  // === Editorial хувилбар — "Гадна үзэмж" (premium automotive зохиомж) ===
  // State, autoplay, swipe, сум — бүгд дээрх ижил логикийг дахин ашиглана.
  if (editorial) {
    const cur = slides[active];
    return (
      <div
        className="ex-showcase"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Хэсгийн шошго — гарчиг биш, тэмдэглэгээ төдий */}
        {title && (
          <div className="ex-showcase__label">
            <h2 className="ex-showcase__label-mn">{title}</h2>
            {subtitle && <p className="ex-showcase__label-sub">{subtitle}</p>}
          </div>
        )}

        {/* Тайз — десктоп дээр 16:9-өөс нарийсахгүй тул машин хэзээ ч
            хажуу тийш тайрагдахгүй; утсанд яг 16:9 (зураг бүтнээрээ). */}
        <div
          className={`ex-showcase__stage ${
            hasMobile ? "ex-showcase__stage--tall" : ""
          } ${slides.length > 1 ? swipe.className : ""}`}
          style={slides.length > 1 ? swipe.style : undefined}
          {...(slides.length > 1 ? swipe.handlers : {})}
        >
          <div className="ex-showcase__track">
            {slides.map((s, i) => {
              /* Слайд бүр идэвхтэйгээсээ хамгийн дөт талд зогсоно — сүүлчийн
                 слайдаас эхлэл рүү эргэхэд ч зөвхөн нэг дэлгэцийн зайд, зөв
                 чиглэлд гүйнэ (өмнө нь бүх слайдаар ухарч буцдаг байв). */
              const off = cyclicOffset(i, active, slides.length);
              /* Циклийн цаагуур үсэрсэн слайд — харагдахгүй газраа шууд
                 байрлалаа авах ёстой, эс тэгвээс дэлгэцийг хөндлөн гарна. */
              const frozen = dragging || slideJumped(i, from, active, slides.length);

              return (
              <div
                key={i}
                className="ex-showcase__slide"
                style={{
                  transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                  /* Чирч байх зуур шилжилт байвал зураг хурунаас хоцорч,
                     "наалдсан" мэдрэмж өгнө — тиймээс түр унтраана. */
                  ...(frozen ? { transition: "none" } : null),
                }}
              >
                {/* Parallax: зураг слайдаасаа УДААН хөдөлнө.
                    Слайд 100% гүйхэд энэ давхарга ердөө 12% эсрэг чиглэлд
                    шилжинэ — хоёр өөр хурдтай давхарга үүсч, хавтгай
                    гулсалтын оронд гүнтэй хөдөлгөөн мэдрэгдэнэ. Идэвхтэй
                    слайд дээр офсет 0 тул зураг яг байрандаа зогсоно. */}
                <div
                  className="ex-showcase__parallax"
                  style={{
                    /* Чирэх үед ч parallax нь трекийн 12%-иар хоцорно —
                       гүний мэдрэмж чирэлтийн туршид тасрахгүй. */
                    transform: `translateX(calc(${off * 12}% - ${dragDx * 0.12}px))`,
                    ...(frozen ? { transition: "none" } : null),
                  }}
                >
                  <ResponsiveSlideImage
                    src={s.image}
                    srcMobile={s.imageMobile}
                    alt={s.caption ? `${alt} — ${s.caption}` : alt}
                    priority={i === 0}
                    containMobile={hasMobile && !s.imageMobile}
                  />
                </div>
              </div>
              );
            })}
          </div>

          {/* Утасны сумнууд — зургийн хоёр захад, босоо голдоо.
              Албан ёсны JETOUR сайтууд утсан дээр яг ийм байрлалтай: хуруу
              зургаас гаралгүй шилжүүлнэ. Десктоп дээр эдгээр далд болж,
              доорх толгойн сумнууд ажиллана (нэг л хувилбар хүртээмжийн
              модонд байна — давхардал үүсэхгүй). */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Өмнөх зураг"
                className="ex-showcase__edge ex-showcase__edge--prev"
              >
                <ChevronLeft size={22} strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Дараагийн зураг"
                className="ex-showcase__edge ex-showcase__edge--next"
              >
                <ChevronRight size={22} strokeWidth={2} aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="ex-showcase__foot">
          {/* Тайлбар — слайд солигдоход зөөлөн fade */}
          <div className="ex-showcase__caption" key={active}>
            {cur?.caption && <p className="ex-showcase__caption-mn">{cur.caption}</p>}
          </div>

          {slides.length > 1 && (
            <div className="ex-showcase__controls">
              <div className="ex-showcase__arrows">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Өмнөх зураг"
                  className="ex-showcase__arrow"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Дараагийн зураг"
                  className="ex-showcase__arrow"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="ex-showcase__meter">
                <span className="ex-showcase__counter">
                  {String(active + 1).padStart(2, "0")}
                  <em>/</em>
                  {String(slides.length).padStart(2, "0")}
                </span>
                {/* Прогресс — хэсэг бүр нь дарж шилжих товч хэвээр
                    (хуучин цэгүүдийн үүргийг алдалгүй нарийн зурвас болгов) */}
                <div className="ex-showcase__progress">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${i + 1}-р зураг`}
                      aria-current={i === active}
                      className="ex-showcase__seg"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0E0E10] ${
        hasMobile ? "aspect-[9/16]" : "aspect-video"
      } lg:aspect-auto lg:h-[clamp(520px,calc(100vh+4rem),1280px)] ${
        slides.length > 1 ? swipe.className : ""
      }`}
      style={slides.length > 1 ? swipe.style : undefined}
      {...(slides.length > 1 ? swipe.handlers : {})}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Гүйдэг зам */}
      <div
        /* Слайдын шилжилт — 500мс ease-out (premium зурвас: 400–600мс) */
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative min-w-full h-full">
            <ResponsiveSlideImage
              src={s.image}
              srcMobile={s.imageMobile}
              alt={s.caption ? `${alt} — ${s.caption}` : alt}
              priority={i === 0}
              containMobile={hasMobile && !s.imageMobile}
            />
            {/* Тайлбартай слайдад л градиент + текст. Тайлбаргүй бол зураг
                цэвэр, юугаар ч дарагдахгүй харагдана. */}
            {s.caption && (
              <>
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                <p
                  className="absolute left-6 lg:left-10 bottom-10 lg:bottom-24 text-white font-bold text-lg lg:text-2xl max-w-xl pr-6"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)" }}
                >
                  {s.caption}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Хэсгийн гарчиг — зургийн дээр. Дээд талд зөөлөн scrim тавьж
          аль ч зураг дээр уншигдахуйц болгов. */}
      {title && (
        <>
          <div className="showcase-title-scrim" aria-hidden />
          <div className="showcase-title">
            <div className="container-page">
              <h2 className="showcase-head__title showcase-head__title--on-image">{title}</h2>
            </div>
          </div>
        </>
      )}

      {slides.length > 1 && (
        <>
          {/* Сумнууд — зөвхөн десктоп. Утсанд шудрах боломжтой тул хэрэггүй. */}
          <div className="absolute bottom-24 right-10 z-10 hidden lg:flex gap-2">
            <button
              onClick={prev}
              aria-label="Өмнөх зураг"
              className="w-10 h-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн зураг"
              className="w-10 h-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Байрлалыг зөвхөн цэгээр илэрхийлнэ — тусдаа тоолуур нэмэлт чимэг болдог */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`${i + 1}-р зураг`}
                className={`h-1 rounded-full transition-all ${
                  i === active ? "w-7 bg-[#E20A17]" : "w-3.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
