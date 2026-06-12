"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CYCLE_STAGES } from "@/lib/content";

export default function ChapterCycle() {
  const section = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const r = ring.current;
    if (!el || !r) return;
    gsap.registerPlugin(ScrollTrigger);

    const len = r.getTotalLength();
    r.style.strokeDasharray = `${len}`;
    r.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      gsap.to(r, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: `top ${55 - i * 4}%`,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const R = 230;
  const cx = 300;
  const cy = 300;

  return (
    <section
      id="cycle"
      ref={section}
      className="relative bg-gradient-to-b from-void via-carbon to-void py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="eyebrow mb-6">Chapter 05 — Circular Energy Systems</p>
        <h2 className="display-xl mb-16 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] text-vapor">
          A loop with no end and no waste.
        </h2>

        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <svg viewBox="0 0 600 600" className="h-full w-full">
            <defs>
              <linearGradient id="cycleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-soft)" />
                <stop offset="50%" stopColor="var(--creame)" />
                <stop offset="100%" stopColor="var(--color-accent-strong)" />
              </linearGradient>
            </defs>
            <circle
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke="var(--color-panel)"
              strokeWidth="1.5"
            />
            <circle
              ref={ring}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke="url(#cycleGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          </svg>

          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-vapor">
              The Cycle
            </span>
            <span className="font-display text-2xl text-vapor md:text-3xl">
              Nothing lost
            </span>
          </div>

          {/* nodes positioned around the ring */}
          {CYCLE_STAGES.map((stage, i) => {
            const angle = (i / CYCLE_STAGES.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + (R / 6) * Math.cos(angle);
            const y = 50 + (R / 6) * Math.sin(angle);
            return (
              <div
                key={stage.label}
                data-node
                className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className="mb-1 h-3 w-3 rounded-full bg-ignite"
                  style={{ boxShadow: "0 0 20px var(--creame)" }}
                />
                <span className="font-display text-base text-vapor md:text-lg">
                  {stage.label}
                </span>
                <span className="font-mono text-[0.6rem] leading-tight text-muted-vapor">
                  {stage.note}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
