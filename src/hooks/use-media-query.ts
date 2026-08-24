"use client";

import { useEffect, useState } from "react";

/**
 * CSS media query-г React-д уншина.
 *
 * Сервер дээр болон hydration хийгдэх хүртэл `false` буцаана — тул зохиомжийн
 * ГОЛ бүтцийг үүгээр шийдэж болохгүй (тэр нь CSS-ийн ажил). Зөвхөн зан үйлийг
 * (жишээ нь: хөдөлгөөнийг зөвхөн том дэлгэцэнд асаах) сонгоход хэрэглэ.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
