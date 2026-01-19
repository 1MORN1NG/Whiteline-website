"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// --- Types ---
type Content = {
  section_id: string;
  headline: string;
  map_label: string;
  stat_experts: string;
  stat_experts_sub: string;
  stat_legacy: string;
  stat_legacy_sub: string;
  ticker_logs: string[];
  cta: string;
};

const content: Record<"en" | "th", Content> = {
  en: {
    section_id: "FIELD_MKT_PRECISION",
    headline: "PRECISION WARFARE: DOMINATING THE LAST MILE.",
    map_label: "LIVE AUDIT STREAM: NATIONWIDE DOMINANCE",
    stat_experts: "200+",
    stat_experts_sub: "TACTICAL EXPERTS",
    stat_legacy: "12Y",
    stat_legacy_sub: "PROPRIETARY DATA",
    ticker_logs: [
      "AUDIT COMPLETE: BKK-01",
      "STOCK UPDATE: CNX-04",
      "CONVERSION ALERT: HYI-09",
      "REPLENISHMENT SYNCED: PHK-02",
    ],
    cta: "RECRUIT THE FORCE",
  },
  th: {
    section_id: "FIELD_MKT_PRECISION",
    headline: "ยุทธศาสตร์ความแม่นยำ: ครองความได้เปรียบในนาทีสุดท้าย",
    map_label: "สตรีมข้อมูลตรวจสอบสด: ครอบคลุมทั่วประเทศ",
    stat_experts: "200+",
    stat_experts_sub: "หน่วยปฏิบัติการภาคสนาม",
    stat_legacy: "12 ปี",
    stat_legacy_sub: "ฐานข้อมูลค้าปลีกอัจฉริยะ",
    ticker_logs: [
      "ตรวจสอบเสร็จสิ้น: กรุงเทพฯ-01",
      "อัปเดตสต็อก: เชียงใหม่-04",
      "แจ้งเตือนการขาย: หาดใหญ่-09",
    ],
    cta: "ระดมพลทีมปฏิบัติการ",
  },
};

// --- Sub-components ---

function NumberTicker({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Extract number and suffix if present (e.g., "200+" -> 200, "+")
  const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, { duration: 2 });
      return controls.stop;
    }
  }, [isInView, count, numericValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="font-heading font-black text-6xl md:text-8xl text-white">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-silver text-sm md:text-base tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}

function MapPings() {
  const [pings, setPings] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPing = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // Keep within 10-90% range
        y: Math.random() * 80 + 10,
      };
      setPings((prev) => [...prev, newPing]);

      // Remove ping after animation
      setTimeout(() => {
        setPings((prev) => prev.filter((p) => p.id !== newPing.id));
      }, 2000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pings.map((ping) => (
        <div
          key={ping.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
          style={{ top: `${ping.y}%`, left: `${ping.x}%` }}
        />
      ))}
    </div>
  );
}

function HorizontalTicker({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden flex bg-void/50 border-t border-b border-white/20 py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 font-mono text-xs md:text-sm text-silver">
             // {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RadarScanline() {
    // Custom tailwind animation added via arbitrary values isn't always reliable without config.
    // Using Framer Motion for reliability here.
    return (
        <motion.div
            className="absolute left-0 right-0 h-[1px] bg-white/30 z-10 box-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        />
    )
}

// --- Main Component ---

export default function FieldMarketing() {
  const [lang, setLang] = useState<"en" | "th">("en");
  const t = content[lang];

  return (
    <section
      id="FIELD_MKT_PRECISION"
      className="w-full bg-black py-20 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <h2 className="font-heading font-black text-4xl md:text-6xl text-white tracking-tighter skew-x-[-6deg] max-w-4xl uppercase">
            {t.headline}
          </h2>

          <button
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            className="font-mono text-sm text-silver border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition-colors"
          >
            {lang === "en" ? "EN / TH" : "TH / EN"}
          </button>
        </div>

        {/* Tactical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 auto-rows-[minmax(200px,auto)]">

          {/* Cell A: Nationwide Map + Live Audit Stream (Col-span 8, Row-span 2) */}
          <div className="col-span-1 md:col-span-8 md:row-span-2 relative border border-white/20 bg-void group hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 overflow-hidden min-h-[400px]">
             <div className="absolute top-4 left-4 z-20">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-white tracking-widest uppercase">{t.map_label}</span>
                 </div>
             </div>

             <RadarScanline />
             <MapPings />

             {/* Simplified Thailand SVG Map */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <svg viewBox="0 0 400 800" className="h-[90%] w-auto fill-none stroke-white stroke-[1]">
                    {/* Abstract path representing Thailand roughly */}
                     <path d="M120,50 L180,20 L220,40 L240,100 L280,120 L280,180 L250,220 L320,280 L300,350 L250,380 L260,450 L220,550 L200,650 L180,750 L140,700 L160,600 L180,500 L150,450 L120,400 L80,350 L50,250 L80,150 L100,100 Z" />
                </svg>
             </div>
          </div>

          {/* Cell B: Tactical Experts (Col-span 4) */}
          <div className="col-span-1 md:col-span-4 border border-white/20 bg-void group hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 min-h-[200px]">
             <NumberTicker value={t.stat_experts} label={t.stat_experts_sub} />
          </div>

          {/* Cell C: Intelligence Legacy (Col-span 4) */}
          <div className="col-span-1 md:col-span-4 border border-white/20 bg-void group hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 min-h-[200px]">
            <NumberTicker value={t.stat_legacy} label={t.stat_legacy_sub} />
          </div>

          {/* Cell D: Real-time Horizontal Ticker (Col-span 12) */}
          <div className="col-span-1 md:col-span-12 mt-4 md:mt-0">
             <HorizontalTicker items={t.ticker_logs} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center md:justify-end">
            <button className="px-12 py-6 bg-black border-2 border-white text-white font-heading font-black text-xl uppercase hover:bg-white hover:text-black transition-colors duration-0">
                {t.cta}
            </button>
        </div>
      </div>
    </section>
  );
}
