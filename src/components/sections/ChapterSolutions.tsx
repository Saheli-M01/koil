"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOLUTIONS } from "@/lib/content";

export default function ChapterSolutions() {
  const section = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel) => {
        const num = panel.querySelector("[data-num]");
        const content = panel.querySelector("[data-content]");
        const metric = panel.querySelector("[data-metric]");

        gsap.fromTo(
          content,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 65%" },
          }
        );
        gsap.fromTo(
          num,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 0.12,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 70%" },
          }
        );
        gsap.fromTo(
          metric,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: panel, start: "top 55%" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="solutions" ref={section} className="relative bg-void">
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-10">
        <p className="eyebrow mb-6">
          Chapter 03 — The Future of Sustainable Energy
        </p>
        <h2 className="display-xl mb-4 text-[clamp(2rem,5vw,4rem)] text-vapor">
          Not products. Innovations.
        </h2>
      </div>

      {SOLUTIONS.map((s) => (
        <article
          key={s.id}
          data-panel
          className="relative flex min-h-screen items-center overflow-hidden border-t border-white/[0.05]"
        >
          {/* oversized index watermark */}
          <span
            data-num
            className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[40vw] leading-none text-vapor opacity-0 md:text-[28vw]"
            style={{ color: s.tint }}
          >
            {s.index}
          </span>

          {/* radial glow keyed to solution tint */}
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
            style={{ background: s.tint }}
          />

          <div
            data-content
            className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:grid-cols-2 md:px-10"
          >
            <div>
              <span
                className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.3em]"
                style={{ color: s.tint }}
              >
                {s.name}
              </span>
              <h3 className="display-xl mb-8 text-[clamp(2.4rem,6vw,5.5rem)] text-vapor">
                {s.lede}
              </h3>
              <p className="max-w-md text-lg leading-relaxed text-muted-vapor">
                {s.body}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center md:items-end md:text-right">
              <span
                data-metric
                className="font-display text-[clamp(4rem,12vw,9rem)] leading-none"
                style={{ color: s.tint }}
              >
                {s.metric}
              </span>
              <span className="mt-4 max-w-[16rem] font-mono text-xs uppercase tracking-[0.2em] text-muted-vapor md:text-right">
                {s.metricLabel}
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
