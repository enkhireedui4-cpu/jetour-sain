"use client";

/**
 * Хамгийн сүүлийн хамгаалалт — root layout өөрөө уналаа гэхэд ажиллана.
 *
 * `error.tsx` нь layout доторх алдааг барьдаг бол энэ нь layout-ыг БҮХЭЛД нь
 * орлуулна. Иймд өөрийн `<html>`/`<body>` шошготой байх ёстой бөгөөд сайтын
 * компонент (Navbar гэх мэт) дуудаж БОЛОХГҮЙ — тэдгээр нь мөн унасан байж
 * магадгүй. Загварыг нь inline-аар өгсөн шалтгаан ч мөн энэ: CSS ачаалагдаагүй
 * байж болзошгүй.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="mn">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          color: "#17181B",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: "0 0 14px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#696F79",
            }}
          >
            Алдаа гарлаа
          </p>
          <h1 style={{ margin: 0, fontSize: "30px", lineHeight: 1.15, fontWeight: 800 }}>
            Сайт ачаалахад алдаа гарлаа
          </h1>
          <p style={{ margin: "18px 0 0", fontSize: "15px", lineHeight: 1.7, color: "#54585F" }}>
            Дахин оролдоно уу. Хэвээр байвал 7277-8855 дугаарт холбогдоорой.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                borderRadius: "999px",
                background: "#17181B",
                color: "#FFFFFF",
                padding: "14px 28px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Дахин оролдох
            </button>
            <a
              href="tel:+97672778855"
              style={{
                borderRadius: "999px",
                border: "1px solid #D7D8DC",
                color: "#17181B",
                padding: "14px 28px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              7277-8855
            </a>
          </div>
          {error.digest && (
            <p style={{ marginTop: "26px", fontSize: "11px", color: "#696F79" }}>
              Алдааны код: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
