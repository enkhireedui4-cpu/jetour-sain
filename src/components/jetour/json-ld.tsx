/**
 * JSON-LD-г нэг мөрөөр гаргах туслах.
 *
 * `dangerouslySetInnerHTML` нь хуудас бүрт давтагдаж байсныг нэг газарт
 * төвлөрүүлэв. `<`-ыг escape хийж байгаа шалтгаан: агуулгад `</script>`
 * гэсэн мөр орвол (жишээ нь CMS-ийн тайлбар дотор) браузер script-ийг эрт
 * хааж, хуудас эвдэрнэ.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
