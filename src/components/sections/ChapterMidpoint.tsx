"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MANUFACTURING, SUSTAINABILITY } from "@/lib/content";
import RevealText from "@/components/ui/RevealText";

export function ChapterManufacturing() {
  const section = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-mfg]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%" },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manufacturing"
      ref={section}
      className="relative bg-void py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="eyebrow mb-6">Chapter 06 - Manufacturing Excellence</p>
        <RevealText
          as="h2"
          className="display-xl mb-20 max-w-5xl text-[clamp(2.2rem,6vw,5rem)] text-vapor"
        >
          A modern industrial innovator, engineered to export-grade precision.
        </RevealText>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {MANUFACTURING.map((m) => (
            <div
              key={m.k}
              data-mfg
              className="grid grid-cols-1 items-baseline gap-4 py-10 md:grid-cols-12"
            >
              <h3 className="col-span-4 font-display text-2xl text-vapor md:text-4xl">
                {m.k}
              </h3>
              <p className="col-span-8 max-w-xl text-lg leading-relaxed text-muted-vapor">
                {m.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChapterSustainability() {
  const section = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: section.current, start: "top 65%" },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sustainability"
      ref={section}
      className="relative overflow-hidden bg-gradient-to-b from-void to-carbon py-32 md:py-48"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-regen/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="eyebrow mb-6">Chapter 07 - Sustainability Commitment</p>
        <h2 className="display-xl mb-20 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] text-vapor">
          Impact you can measure, not just claim.
        </h2>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04] lg:grid-cols-4">
          {SUSTAINABILITY.map((s) => (
            <div key={s.label} data-stat className="bg-void p-8 md:p-10">
              <div className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-regen">
                {s.value}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-vapor">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
