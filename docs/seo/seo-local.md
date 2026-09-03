# Орон нутгийн SEO — Google Search Console, Maps, бүтэцтэй өгөгдөл

JETOUR Mongolia (Сайн Моторс ХХК) — Монгол дахь албан ёсны дистрибьютор.
Хэрэглэгч «Jetour Монгол», «Jetour шоурум хаяг», «Jetour засвар» гэж хайдаг.
Энэ баримт нь тэр хайлтуудад **хаана ямар мэдээлэл**-ээс хариу бүрддэг, түүнийг
хэн, хэрхэн шинэчлэхийг тайлбарлана.

---

## 1. Мэдээллийн эх сурвалж — `src/lib/branches.ts`

Хаяг, утас, ажлын цаг, координат, үзүүлэх үйлчилгээ — **бүгд ЭНД** бичигдэнэ.
Дараах бүхэн үүнээс автоматаар үүсдэг:

| Хаана гарах | Юу гарах |
|---|---|
| `/dealer` хуудас | Байршил сонгогч (01/02), идэвхтэй байршлын газрын зураг |
| `/owners` хуудас | Үйлчилгээний төвийн хаяг, утас, Google Maps товч |
| Сайтын footer (бүх хуудас) | Шоурумын хаяг, үйлчилгээний төвийн хаяг, утас, цаг |
| JSON-LD (`src/lib/schema.ts`) | `AutoDealer` + `AutoRepair` — хаяг, `geo`, ажлын цаг, `hasMap` |

**Хаягийг өөр хаана ч давхардуулж бичихгүй.** Өмнө нь `layout.tsx` дотор хаяг
хатуу бичигдсэн байсан тул `branches.ts`-ийг зассан ч Google-д хуучин хаяг
очсоор байв.

### Координат нэмэх / засах

```ts
// src/lib/branches.ts дотор тухайн салбарт
geo: { lat: 47.897841, lng: 106.796819 },
```

Координатыг **зохиохгүй**. Авах зам:

1. Google Maps дээр байршил дээрээ **баруун товшино** → эхний мөрөнд гарах
   `47.897841, 106.796819` гэсэн тоог хуулна, эсвэл
2. Google Business Profile → Info → Location.

`geo` байвал газрын зураг зүүг **яг тэнд** буулгаж, JSON-LD-д `GeoCoordinates`
орно. Байхгүй бол `mapQuery`-гээр (бүртгэлийн нэрээр) хайж харуулна — цэг
ойролцоо, гэхдээ буруу тоо биш.

**Одоогийн байдал:**

| Салбар | `geo` | `placeCid` | Эх сурвалж |
|---|---|---|---|
| **JETOUR Шоурум** (Чингэлтэй, Holiday Inn-ийн урд) | `47.9210074, 106.9015123` | `16164080384796614770` | «Sain Motors-Сайн Моторс-Jetour» бүртгэл (`rb.gy/xji02i`) |
| **JETOUR сервис төв** (Хан-Уул, ТЭЦ-4) | `47.897841, 106.796819` | — (бүртгэлгүй, зүү) | Sain Motors-ийн тавьсан зүү |

### `placeCid` — бүртгэл рүү шууд

`placeCid` байвал «Google Maps» товч нь **бизнесийн бүртгэл** рүү
(`google.com/maps?cid=…`) орно: нэр, ажлын цаг, зураг, сэтгэгдэл, «Залгах»
товчтой. Байхгүй бол зөвхөн координат дээр зүү тавьсан хоосон карт гарна.

Авах зам: Google Maps дээр бүртгэлээ нээгээд URL дахь `!1s0x…:0xАБВ` хэсгийн
**хоёрдугаар** hex тоог аравтад хөрвүүлнэ:

```bash
node -e "console.log(BigInt('0xe052597810a96072').toString())"
```

> ⚠️ **Хоёр бүртгэл байна.** «Sain Motors-Сайн Моторс-Jetour» (дээрх cid) ба
> «Jetour show room» (KG id `/g/11y1t7b8by`) гэсэн ХОЁР өөр бүртгэл олдсон.
> Нэг бизнест хоёр бүртгэл байх нь сэтгэгдэл, зураг, үзэлтийг хуваан, Google-д
> «аль нь жинхэнэ вэ» гэсэн эргэлзээ үүсгэдэг. Google Business Profile → дуплик
> бүртгэлийг **нэгтгэх (merge)** эсвэл хаах. Сайт нь дээрх cid-тай бүртгэлийг
> заасан — үлдэх бүртгэлийг сольвол `branches.ts` дахь `placeCid`-ыг тааруул.

### Богино холбоос ХЭРЭГЛЭХГҮЙ

`maps.app.goo.gl/…`, `share.google/…` зэрэг богино холбоос нь хугацаа дуусах,
бүртгэл засагдах үед **үхдэг** (туршиж баталсан: `Dynamic Link Not Found`).
Тиймээс код нь `branchMap()`-ээр албан ёсны, тогтвортой хэлбэрийг үүсгэнэ:

```
mapEmbed      https://www.google.com/maps?q=<цэг>&output=embed
mapLink       https://www.google.com/maps/search/?api=1&query=<цэг>
```

---

## 1b. Домэйныг `jetour.mn` болгох (домэйн шилжилт)

Сайт одоо `jetour.sainmotors.mn` дээр. `jetour.mn` руу шилжүүлэх бол:

### Одоогийн байдал (2026-09-03-нд шалгасан)

| Шалгалт | Үр дүн |
|---|---|
| `jetour.mn` бүртгэл | **бий** — NS: `ns1–ns4.dns.mn` |
| `jetour.mn` A/CNAME | **АЛГА** — домэйн хаана ч заахгүй |
| `www.jetour.mn` | бичлэг огт байхгүй (NXDOMAIN) |
| HTTP 80 / HTTPS 443 | хоёулаа хариу алга |

> **SSL нь шалтгаан биш, үр дагавар.** Vercel нь домэйн зөв заасны дараа
> Let's Encrypt сертификатыг **автоматаар, үнэгүй** олгож, дараа нь өөрөө
> шинэчилдэг. Тусад нь SSL худалдаж авах шаардлагагүй. Одоо сертификат
> байхгүй байгаа нь DNS бичлэг байхгүйгээс.

### Дараалал

1. **Vercel → Project → Settings → Domains** → `jetour.mn` ба
   `www.jetour.mn` нэмнэ.
2. Vercel тэр даруй **яг ямар DNS бичлэг** хэрэгтэйг харуулна (apex-д `A`,
   `www`-д `CNAME`). Тэр утгыг **хуулж** ав — IP-г санах ойгоор бичихгүй,
   Vercel өөрөө өөрчилдөг.
3. Домэйны DNS-ийг `dns.mn` (бүртгэгч) дээр нээж, Vercel-ийн үзүүлсэн
   бичлэгийг тавина.
4. Тархалт 5 мин – 1 цаг. Vercel дээр «Valid Configuration» болмогц
   сертификат өөрөө гарна.
5. **Аль нь үндсэн (primary)** болохыг Vercel дээр сонгоно. Санал:
   `jetour.mn` — богино, брэндийн нэртэй. Бусад нь 301-ээр түүн рүү
   чиглүүлэгдэнэ (Vercel өөрөө хийнэ).

### Кодын тал — зөвхөн ХОЁР env

Кодод домэйн ХАТУУ бичээгүй: `SITE_URL` нь `NEXT_PUBLIC_SITE_URL`-ээс
ирдэг (`src/lib/site.ts`), canonical / sitemap / robots / OG / JSON-LD
бүгд түүнээс үүснэ. Тиймээс:

| Env | Шинэ утга | Мартвал юу болох |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://jetour.mn` | canonical, sitemap, OG бүгд хуучин домэйн заасаар байж, Google шинэ домэйныг **хуулбар** гэж үзнэ |
| `NEXTAUTH_URL` | `https://jetour.mn` | **admin нэвтрэлт эвдэрнэ** (`/admin/login` callback буруу домэйн руу очно) |

Дараа нь **Redeploy** — `NEXT_PUBLIC_*` нь build үед шингэдэг тул env
хадгалахад хүчин төгөлдөр болохгүй.

### Шилжилтийн дараах SEO

- GSC-д `jetour.mn` шинэ property нэмж баталгаажуулах, `sitemap.xml` submit.
- Хуучин `jetour.sainmotors.mn` GSC-д баталгаажсан бол
  **Settings → Change of address** ашиглаж эрх дамжуулах.
- Google Business Profile-ийн «Website» талбарыг шинэ домэйн болгох.
- Хуучин домэйн руу заасан гадаад холбоос, Meta реклам, QR — 301 ажиллаж
  байгаа эсэхийг шалгах.

---

## 2. Google Search Console (Vercel)

### 2.1 Property нэмэх

GSC → **Add property**. Хоёр сонголт:

| Төрөл | Хамрах хүрээ | Баталгаа |
|---|---|---|
| **Domain** (зөвлөж байна) | `jetour.mn` + бүх subdomain, http/https | DNS TXT бичлэг |
| **URL prefix** | зөвхөн яг тэр хаяг | HTML meta tag ✅ кодод бэлэн |

### 2.2 Meta tag-аар баталгаажуулах (кодод бэлэн)

1. GSC → URL prefix → **HTML tag** сонгоно.
2. Гарах `<meta name="google-site-verification" content="XXXX" />`-ээс
   **`content`-ийн утгыг л** хуулна.
3. Vercel → Project → Settings → **Environment Variables**:
   - Name: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: `XXXX`
   - Environments: **Production** (Preview-д шаардлагагүй)
4. **Redeploy** — env хувьсагч нь build үед шингэдэг тул зүгээр хадгалахад
   хүчин төгөлдөр болохгүй.
5. GSC → **Verify**.

Тохируулаагүй бол Next нь тагийг огт гаргахгүй (`layout.tsx` дотор нөхцөлтэй) —
локал ба preview дээр хог үлдэхгүй.

### 2.3 DNS-ээр баталгаажуулах (Domain property)

Домэйны DNS-д GSC өгсөн `TXT` бичлэгийг нэмнэ. Домэйн Vercel дээр байвал:
Vercel → Domains → тухайн домэйн → **DNS Records** → Add → Type `TXT`,
Name `@`, Value `google-site-verification=…`. Тархахад 5–60 минут.

### 2.4 Sitemap илгээх

GSC → **Sitemaps** → `sitemap.xml` → Submit.

Sitemap нь `src/app/sitemap.ts` дотор **динамикаар** үүсдэг: статик хуудсууд +
загвар + тусгай санал + мэдээ. Шинэ загвар admin-аар нэмэхэд sitemap өөрөө
дагана — гараар засах шаардлагагүй.

`robots.txt` (`src/app/robots.ts`) нь `/admin/`, `/api/`-г хааж, sitemap-ийн
хаягийг зааж байгаа.

> **Урх:** `NEXT_PUBLIC_SITE_URL` буруу бол canonical, sitemap, OG зураг бүгд
> буруу домэйн заана. Deploy-ийн өмнө ЗААВАЛ шалга.

---

## 3. Google Business Profile — NAP тууштай байдал

Google нь сайт дээрх хаяг/утас/нэрийг Business Profile-тай **тааруулж** шалгадаг.
Зөрүү нь орон нутгийн хайлтын дохиог сулруулна. Тиймээс:

- [ ] Бизнесийн нэр: сайт дээрх `JETOUR Mongolia — SAIN MOTORS`-той нийцэж байна уу
- [ ] Хаяг: `branches.ts` дахь мөртэй **үсэг үсгээр** ижил
- [ ] Утас: хоёр байршил НЭГ дугаартай — `7010-8855`
- [ ] Ажлын цаг: **шоурум** Да–Ням 09:00–20:00 · **сервис төв** Да–Ба
      09:00–18:00, Бя 10:00–15:00, Ням амарна
- [ ] Категори: *Car dealer* (үндсэн) + *Auto repair shop* (нэмэлт)
- [ ] Сервис төвийг **тусдаа байршил** болгон бүртгэх — өөр хаяг, өөр цаг
- [ ] Дуплик бүртгэлийг нэгтгэх — «Jetour show room» ↔ «Sain Motors-Сайн
      Моторс-Jetour» (сайт нь сүүлийнхийг заасан)
- [ ] Вэбсайтын холбоос: шоурум → `/dealer`, үйлчилгээ → `/dealer`
- [ ] Зураг: шоурумын бодит фото (`public/showroom/*`) байршуулах

---

## 4. Бүтэцтэй өгөгдөл (JSON-LD)

`src/lib/schema.ts` — **нэг эх сурвалж**. Гурван функц:

| Функц | Хаана | Юу гаргах |
|---|---|---|
| `dealerGraph()` | `layout.tsx` (сайт даяар), `/dealer` (үнийн мужтай) | `AutoDealer` + `department: AutoRepair` + `WebSite` |
| `vehicleSchema(model)` | `/models/[id]` | `Car` + `Offer` (үнэ, MNT, нөөц) |
| `breadcrumbList(items)` | `/dealer`, `/models/[id]` | `BreadcrumbList` |

Дүрэм: **байхгүй утгыг оруулахгүй.** `prune()` нь `undefined`, хоосон мөр,
хоосон массивыг гүнзгий цэвэрлэдэг — Google-д хоосон талбар нь алдаа болж,
rich result-ыг бүхэлд нь унагаадаг.

Мөн **хуурамч үнэлгээ бичихгүй**: `aggregateRating`, `review` нь бодит
үйлчлүүлэгчийн үнэлгээгүйгээр Google-ийн бодлого зөрчинө (шийтгэл хүртэл).

### Шалгах

- Rich Results Test — https://search.google.com/test/rich-results
- Schema.org validator — https://validator.schema.org/
- Шалгах хуудсууд: `/` (дилер), `/dealer` (дилер + үнийн муж + замын мөр),
  `/models/x70-plus` (машин + үнэ), `/news/<slug>` (нийтлэл)
- Deploy-ийн дараа GSC → **Enhancements** хэсэгт алдаа гарч байгаа эсэхийг 3–7
  хоногийн дараа шалгана.

---

## 5. Deploy-ийн дараах дараалал

1. Vercel дээр `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` →
   Redeploy.
2. GSC → Verify → Sitemaps → `sitemap.xml` submit.
3. GSC → URL Inspection → `/dealer` → **Request indexing** (шинэ хуудас биш ч
   агуулга нь их өөрчлөгдсөн).
4. Rich Results Test-ээр `/` ба `/dealer`-ыг шалгах.
5. Google Business Profile дээрх NAP-ыг дээрх шалгах хуудсаар тааруулах.
6. Дуплик Google бүртгэлийг нэгтгэх («Jetour show room» ↔ «Sain Motors-Сайн
   Моторс-Jetour») — дээрх анхааруулгыг үзнэ үү.
7. Үйлчилгээний төвийг Google Business Profile дээр **тусдаа байршил** болгон
   бүртгэх (одоогоор зөвхөн зүү — нэр, цаг, сэтгэгдэл байхгүй).
