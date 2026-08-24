import { permanentRedirect } from "next/navigation";

/**
 * Баталгааны агуулга `/owners` (Үйлчилгээ ба баталгаа) руу нэгтгэгдсэн.
 *
 * Хуудсыг устгалгүй 308-аар чиглүүлнэ: хуучин холбоос, хайлтын индекс,
 * хуваалцсан линк эвдрэхгүй.
 */
export default function WarrantyRedirect() {
  permanentRedirect("/owners");
}
