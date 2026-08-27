import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * `public/` доторх зургийн хэмжээг сервер талд уншина.
 *
 * ЯАГААД ХЭРЭГТЭЙ ВЭ. `next/image`-д харьцаа мэдэгдэх ёстой — эс тэгвээс
 * зураг сунах эсвэл зай эзлэхгүй. Постерууд өөр өөр харьцаатай
 * (1920×1286 ба 1920×1920) тул тоог хатуу бичиж болохгүй.
 *
 * Админаас шинэ постер оруулбал энэ нь автоматаар зөв уншина — хэмжээг
 * өгөгдлийн санд давхардуулан хадгалах шаардлагагүй.
 *
 * Дуудалт нь ISR-ийн хугацаанд (10 мин) л хийгддэг бөгөөд процессын
 * дотор кэшлэгддэг тул өртөг өчүүхэн.
 */

type Size = { width: number; height: number };

const cache = new Map<string, Size | null>();

export async function localImageSize(publicPath: string): Promise<Size | null> {
  if (cache.has(publicPath)) return cache.get(publicPath) ?? null;

  let size: Size | null = null;
  try {
    // Зөвхөн `public/` доторх зам — гадаад URL, дээш гарах зам хүлээж авахгүй
    if (publicPath.startsWith("/") && !publicPath.includes("..")) {
      const abs = path.join(process.cwd(), "public", publicPath);
      const buf = await fs.readFile(abs);
      const meta = await sharp(buf).metadata();
      if (meta.width && meta.height) {
        size = { width: meta.width, height: meta.height };
      }
    }
  } catch {
    // Файл олдохгүй бол `null` — дуудагч тал нөөц зан төлөв рүү шилжинэ
    size = null;
  }

  cache.set(publicPath, size);
  return size;
}
