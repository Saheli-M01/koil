"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CYCLE_STAGES } from "@/lib/content";

export default function ChapterCycle() {
  const section = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const glow = useRef<SVGCircleElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const r = ring.current;
    const g = glow.current;
    const h = head.current;
    if (!el || !r || !g || !h) return;
    gsap.registerPlugin(ScrollTrigger);

    const len = r.getTotalLength();
    [r, g].forEach((c) => {
      c.style.strokeDasharray = `${len}`;
      c.style.strokeDashoffset = `${len}`;
    });

    const R = 230;
    const cx = 300;
    const cy = 300;

    const ctx = gsap.context(() => {
      // Pin the section and drive progress via scrub
      const st = ScrollTrigger.create({
        trigger: el,
        start: "center center",
        end: "+=160%",
        pin: pin.current,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const offset = len * (1 - progress);

          r.style.strokeDashoffset = `${offset}`;
          g.style.strokeDashoffset = `${offset}`;

          // Move the leading glow dot along the path
          const angle = progress * Math.PI * 2 - Math.PI / 2;
          const hx = cx + R * Math.cos(angle);
          const hy = cy + R * Math.sin(angle);
          h.setAttribute("cx", `${hx}`);
          h.setAttribute("cy", `${hy}`);
          h.style.opacity = progress > 0.005 && progress < 0.998 ? "1" : "0";

          if (counter.current) {
            counter.current.textContent = `${Math.round(progress * 100)}%`;
          }

          // Activate nodes as the ring sweeps past them
          gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node, i) => {
            const nodeProgress = i / CYCLE_STAGES.length;
            const active = progress >= nodeProgress - 0.01;
            node.classList.toggle("is-active", active);
            
            // Animate node appearance as ring passes
            if (active && node.style.opacity === "0") {
              gsap.to(node, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
              });
            }
          });
        },
      });

      // Set initial state for all nodes
      gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
        gsap.set(node, { opacity: 0, scale: 0.6, y: 12 });
      });

      return () => st.kill();
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
      className="relative overflow-hidden bg-gradient-to-b from-void via-carbon to-void pt-32"
    >
      <div ref={pin} className="relative h-screen w-full overflow-hidden">
        {/* ambient backdrop glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--creame) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-10">
          <p className="eyebrow mb-6">Chapter 05 - Circular Energy Systems</p>

          <div className="flex items-center">
            <h2 className="display-xl mb-6 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] text-vapor ">
              A loop with no end and no waste.
            </h2>

            <div className="relative mx-auto aspect-square w-full max-w-[500px] ">
              <svg viewBox="0 0 600 600" className="h-full w-full">
                <defs>
                  <linearGradient id="cycleGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-soft)" />
                    <stop offset="50%" stopColor="var(--creame)" />
                    <stop
                      offset="100%"
                      stopColor="var(--color-accent-strong)"
                    />
                  </linearGradient>
                  <filter
                    id="ringGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* track */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={R}
                  fill="none"
                  stroke="var(--color-panel)"
                  strokeWidth="1.5"
                />

                {/* soft glow trace beneath progress ring */}
                <circle
                  ref={glow}
                  cx={cx}
                  cy={cy}
                  r={R}
                  fill="none"
                  stroke="var(--creame)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.18"
                  filter="url(#ringGlow)"
                  transform={`rotate(-90 ${cx} ${cy})`}
                />

                {/* progress ring */}
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

                {/* leading head dot */}
                <circle
                  ref={head}
                  r="6"
                  fill="var(--creame)"
                  style={{
                    opacity: 0,
                    filter: "drop-shadow(0 0 10px var(--creame))",
                    transition: "opacity 0.2s linear",
                  }}
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
                <span
                  ref={counter}
                  className="mt-2 font-mono text-[0.65rem] tracking-[0.25em] text-color-accent-soft"
                >
                  0%
                </span>
              </div>

              {/* nodes positioned around the ring */}
              {CYCLE_STAGES.map((stage, i) => {
                const angle =
                  (i / CYCLE_STAGES.length) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + (R / 6) * Math.cos(angle);
                const y = 50 + (R / 6) * Math.sin(angle);
                return (
                  <div
                    key={stage.label}
                    data-node
                    className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center transition-[filter] duration-500"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span
                      className="node-dot mb-1 h-3 w-3 rounded-full bg-ignite transition-all duration-500"
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
        </div>
      </div>

      <style jsx>{`
        [data-node] {
          opacity: 0.35;
          filter: grayscale(0.6) brightness(0.6);
        }
        [data-node].is-active {
          opacity: 1;
          filter: grayscale(0) brightness(1);
        }
        [data-node].is-active .node-dot {
          transform: scale(1.3);
          box-shadow:
            0 0 24px var(--creame),
            0 0 48px var(--creame);
        }
      `}</style>
    </section>
  );
}
