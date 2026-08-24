# Урьдчилсан захиалгын мэдээллийг Google Sheets-т хүлээн авах

Хүсэлт илгээхэд сайт нь **гурван зүйл зэрэг** хийдэг (нэг нь бүтэлгүйтвэл бусад нь ажилласаар байна):

1. Telegram-д мэдэгдэнэ
2. Өгөгдлийн санд хадгална (админ хэсгээс харагдана)
3. **Google Sheets-т мөр нэмнэ** ← доорх тохиргоо шаардана

---

## 1. Google Sheets бэлтгэх

Хүснэгтийнхээ **эхний хуудсын 1-р мөрөнд** дараах гарчгуудыг тавина
(дараалал нь код дахь дараалалтай таарах ёстой):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Огноо | Төрөл | Нэр | Утас | Загвар | Тайлбар |

## 2. Apps Script нэмэх

Хүснэгт дээрээ **Extensions → Apps Script** гэж ороод доорх кодыг тавина
(`Code.gs` дотор байгаа бүхнийг дарж бичнэ):

```javascript
// Сайтаас ирэх урьдчилсан захиалгыг хүснэгтэд нэмнэ.
const SECRET = 'ӨӨРИЙН-НУУЦ-ҮГЭЭ-ЭНД'; // сайтын .env дэх утгатай ижил байх

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return ContentService.createTextOutput('forbidden');
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(data.createdAt || Date.now()),
      data.type || '',
      data.name || '',
      data.phone || '',
      data.model || '',
      data.message || '',
    ]);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}
```

`SECRET`-д өөрийн санамсаргүй нууц үг тавина (жишээ нь 20 санамсаргүй тэмдэгт).
Ингэснээр танай webhook хаягийг олсон хүн ч хүснэгтэд хамаагүй мөр нэмж чадахгүй.

## 3. Web App болгож нийтлэх

Apps Script дотор **Deploy → New deployment**:

| Тохиргоо | Утга |
|---|---|
| Type | **Web app** |
| Execute as | **Me** |
| Who has access | **Anyone** |

`Deploy` дарж, гарч ирэх **Web app URL**-ыг хуулж авна
(`https://script.google.com/macros/s/…/exec` хэлбэртэй).

> `Who has access: Anyone` гэдэг нь хүснэгтийг олон нийтэд нээж байгаа биш —
> зөвхөн энэ скриптийг дуудах боломжтой болгож байна. Хүснэгт өөрөө нээгдэхгүй,
> мөн `SECRET` нь хамаагүй хүн бичихээс хамгаална.

## 4. Сайтад тохируулах

Төслийн `.env` (эсвэл сервер дээрх орчны хувьсагч) дотор:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_SECRET=ӨӨРИЙН-НУУЦ-ҮГЭЭ-ЭНД
```

Дараа нь серверээ дахин ачаална.

## Шалгах

Хуудсан дээрх формыг бөглөж илгээгээд:

- Хүснэгтэд шинэ мөр нэмэгдсэн байх ёстой
- `/api/lead` хариунд `"sheeted": true` гэж ирнэ

`GOOGLE_SHEETS_WEBHOOK_URL` тохируулаагүй бол Sheets руу илгээх хэсэг
**чимээгүй өнгөрнө** — хүсэлт нь Telegram болон өгөгдлийн санд хэвийн хадгалагдана.
