"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INDUSTRIES } from "@/lib/content";

const BG = [
  "var(--color-bg)",
  "var(--color-surface)",
  "color-mix(in srgb, var(--color-bg) 88%, var(--creame))",
];

export default function ChapterIndustries() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const t = track.current;
    if (!el || !t) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-ind]");
      const totalShift = t.scrollWidth - window.innerWidth;

      gsap.to(t, {
        x: -totalShift,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${totalShift}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((p) => {
        gsap.fromTo(
          p.querySelector("[data-ind-title]"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              containerAnimation: gsap.getById("ind") as never,
              start: "left center",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="industries"
      ref={section}
      className="relative overflow-hidden bg-void"
    >
      <div ref={track} className="flex h-screen w-max">
        {/* intro panel */}
        <div className="flex h-screen w-screen flex-col justify-center px-6 md:px-20">
          <p className="eyebrow mb-6">Chapter 04 — Powering Industries</p>
          <h2 className="display-xl max-w-3xl text-[clamp(2.4rem,7vw,6rem)] text-vapor">
            One fuel. Three frontiers of motion.
          </h2>
          <p className="mt-8 max-w-md text-muted-vapor">
            Scroll sideways through the sectors KOIL keeps moving — each its own
            environment, each decarbonizing on its own terms.
          </p>
        </div>

        {INDUSTRIES.map((ind, i) => (
          <article
            key={ind.id}
            data-ind
            className="relative flex h-screen w-screen flex-col justify-center px-6 md:px-20"
            style={{ background: BG[i] }}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-display text-[30vw] leading-none text-white/[0.03] md:right-20">
              0{i + 1}
            </span>
            <div data-ind-title className="relative z-10 max-w-3xl">
              <span className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.3em] text-ember">
                {ind.name}
              </span>
              <h3 className="display-xl mb-8 text-[clamp(2.6rem,8vw,7rem)] text-vapor">
                {ind.line}
              </h3>
              <p className="max-w-lg text-lg leading-relaxed text-muted-vapor">
                {ind.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
