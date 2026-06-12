"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/ui/RevealText";

const STAGES = [
  { id: "01", from: "Used cooking oil", to: "Recovered feedstock" },
  { id: "02", from: "Waste fats & residue", to: "Purified input" },
  { id: "03", from: "Spent streams", to: "Refined biofuel" },
];

export default function ChapterWaste() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const t = track.current;
    if (!el || !t) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      rows.forEach((row) => {
        const fill = row.querySelector("[data-fill]");
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 1,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="waste"
      ref={section}
      className="relative bg-void py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="eyebrow mb-8">Chapter 02 - From Waste to Fuel</p>
        <RevealText
          as="h2"
          className="display-xl mb-20 max-w-4xl text-[clamp(2.2rem,6vw,5rem)] text-vapor leading-[6]"
        >
          Most companies see waste. We see energy waiting to change form.
        </RevealText>

        <div ref={track} className="space-y-px">
          {STAGES.map((s) => (
            <div
              key={s.id}
              data-row
              className="group relative grid grid-cols-12 items-center gap-4 border-t border-white/[0.06] py-8 md:py-12"
            >
              <span className="col-span-2 font-mono text-sm text-muted-vapor md:col-span-1">
                {s.id}
              </span>
              <span className="col-span-4 font-display text-xl text-muted-vapor md:col-span-4 md:text-3xl">
                {s.from}
              </span>
              <div className="relative col-span-2 hidden h-[1px] md:col-span-2 md:block">
                <div className="absolute inset-0 bg-white/10" />
                <div
                  data-fill
                  className="absolute inset-0 origin-left bg-gradient-to-r from-ember to-regen"
                />
                <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-regen" />
              </div>
              <span className="col-span-4 text-right font-display text-xl text-vapor md:col-span-5 md:text-3xl">
                {s.to}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-20 max-w-xl text-lg leading-relaxed text-muted-vapor">
          The circular economy isn&apos;t a slogan here - it&apos;s a process.
          What enters as discard leaves as fuel, and nothing is burned away that
          can be regenerated instead.
        </p>
      </div>
    </section>
  );
}
