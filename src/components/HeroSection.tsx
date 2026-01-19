"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LightningW from "./LightningW";
import GlitchText from "./GlitchText";
import GlassCard from "./GlassCard";

const content = {
  en: {
    headlineStart: "TRANSFORMING",
    headlineGlitch: "PRESENCE",
    headlineEnd: "INTO PROFIT",
    sub: "Everything is Possible: Where Tech-Enabled O2O Integration makes the impossible, inevitable.",
    origin:
      "We didn't just witness the retail evolution; we rewrote the code using 12 years of proprietary retail data.",
    cta: "ACCESS OUR DATA",
  },
  th: {
    headlineStart: "พลิกโฉมการตลาดจาก",
    headlineGlitch: "สร้างตัวตน",
    headlineEnd: "สู่การสร้างกำไร",
    sub: "ทุกอย่างเป็นไปได้: เชื่อมต่อโลก O2O เต็มรูปแบบด้วยเทคโนโลยี",
    origin:
      "เราไม่ได้เป็นเพียงผู้เห็นเหตุการณ์วิวัฒนาการค้าปลีก แต่เราคือผู้เขียนรหัสใหม่ด้วยฐานข้อมูลเชิงลึกตลอด 12 ปี",
    cta: "เข้าถึงฐานข้อมูลของเรา",
  },
};

export default function HeroSection() {
  const [lang, setLang] = useState<"en" | "th">("en");
  const [shake, setShake] = useState(false);
  const { scrollY } = useScroll();

  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const overlayBlur = useTransform(scrollY, [0, 500], ["blur(20px)", "blur(0px)"]);

  // Text reveal effects
  const textOpacity = useTransform(scrollY, [0, 300], [0.3, 1]);
  const textBlur = useTransform(scrollY, [0, 300], ["blur(10px)", "blur(0px)"]);

  const t = content[lang];

  return (
    <section
      id="HERO_GLOBAL_01"
      className="relative h-[200vh] w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 flex">
        {/* Left: Gritty Texture */}
        <div className="w-1/2 h-full bg-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full filter contrast-150 brightness-100">
              <filter id="noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>

        {/* Right: Data Grid */}
        <div className="w-1/2 h-full bg-void relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 19px, #333 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #333 20px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>

      {/* Shake Wrapper + Content Reveal */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={shake ? { x: [-2, 2, -2, 0] } : {}}
        transition={{ duration: 0.2 }}
        style={{ opacity: textOpacity, filter: textBlur as any }}
      >
        {/* Foreground Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] h-full">
          {/* Left Column */}
          <div className="flex flex-col justify-center pl-8 md:pl-32 pr-8 pt-20">
            <div className="mb-8">
              <LightningW onAnimationComplete={() => setShake(true)} />
            </div>

            <h1 className="font-heading font-black text-7xl md:text-9xl leading-[0.9] text-white -ml-8 md:-ml-20 tracking-tighter">
              {/* TRANSFORMING: Outlined */}
              <span className="text-transparent font-outline-1 md:font-outline-2">
                {t.headlineStart}
              </span>{" "}

              {/* PRESENCE: Filled White */}
              <span className="text-white block md:inline">
                {t.headlineGlitch}
              </span>{" "}

              {/* INTO PROFIT: Glitching */}
              <GlitchText
                text={t.headlineEnd}
                className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] block md:inline"
              />
            </h1>

            <p className="mt-8 text-silver font-body text-lg md:text-xl max-w-xl">
              {t.sub}
            </p>

            <div className="mt-12">
              <button className="px-8 py-4 border-2 border-white bg-black text-white font-bold uppercase hover:bg-white hover:text-black transition-colors duration-0">
                {t.cta}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-end p-8 md:p-16 border-l border-white/10 bg-void/50 backdrop-blur-sm">
            <div className="flex justify-end mb-auto pt-4">
              <button
                onClick={() => setLang(lang === "en" ? "th" : "en")}
                className="text-white font-mono text-sm border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition-colors"
              >
                {lang === "en" ? "EN / TH" : "TH / EN"}
              </button>
            </div>

            <GlassCard>
              <div className="flex flex-col gap-6 font-mono text-sm text-silver">
                <div className="border-b border-white/20 pb-4">
                  <span className="block text-white text-2xl font-bold mb-1">
                    12 YEARS
                  </span>
                  Retail Data
                </div>
                <div className="border-b border-white/20 pb-4">
                  <span className="block text-white text-2xl font-bold mb-1">
                    200+
                  </span>
                  Experts (Scale & Speed)
                </div>
                <div>
                  <span className="block text-white text-2xl font-bold mb-1">
                    REAL-TIME
                  </span>
                  Audit (Precision)
                </div>
              </div>
            </GlassCard>

            <p className="mt-8 text-xs text-silver/50 font-mono">
                {t.origin}
            </p>
          </div>
        </div>
      </motion.div>

        {/* Luminance Transition Overlay */}
        <motion.div
          className="absolute inset-0 z-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity, backdropFilter: overlayBlur as any }}
        />
      </div>
    </section>
  );
}
