"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, MessageSquare, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";

export function StickyContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* === Desktop: floating right side === */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2"
          >
            <a
              href={CONTACT.phone1Href}
              className="group relative w-12 h-12 grid place-items-center rounded-full bg-[#17181B] text-white shadow-lg hover:bg-[#E20A17] transition-colors"
              aria-label="Залгах"
            >
              <Phone className="w-5 h-5" />
              <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-display font-bold bg-[#17181B] text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Залгах
              </span>
            </a>
            <button
              onClick={() => document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative w-12 h-12 grid place-items-center rounded-full bg-[#E20A17] text-white shadow-lg hover:bg-[#E20A17] transition-colors"
              aria-label="Тест драйв"
            >
              <Calendar className="w-5 h-5" />
              <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-display font-bold bg-[#17181B] text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Тест драйв
              </span>
            </button>
            <button
              onClick={() => document.querySelector("#dealer")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative w-12 h-12 grid place-items-center rounded-full bg-[#232428] text-white shadow-lg hover:bg-[#E20A17] transition-colors"
              aria-label="Үнийн санал"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-display font-bold bg-[#17181B] text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Үнийн санал
              </span>
            </button>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 grid place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-display font-bold bg-[#17181B] text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                WhatsApp
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Mobile: fixed bottom bar === */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#17181B]/95 backdrop-blur-md border-t border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-4 gap-1 px-2 py-2">
              <a
                href={CONTACT.phone1Href}
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E20A17]" />
                <span className="text-[0.6rem] font-display font-semibold">Залгах</span>
              </a>
              <button
                onClick={() => document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })}
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#E20A17]" />
                <span className="text-[0.6rem] font-display font-semibold">Тест</span>
              </button>
              <button
                onClick={() => document.querySelector("#dealer")?.scrollIntoView({ behavior: "smooth" })}
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#E20A17]" />
                <span className="text-[0.6rem] font-display font-semibold">Санал</span>
              </button>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="text-[0.6rem] font-display font-semibold">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
