"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ChapterClosing() {
  const section = useRef<HTMLDivElement>(null);
  const orb = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // the liquid energy returns — orb grows then settles
      gsap.fromTo(
        orb.current,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        "[data-close-line]",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-close-block]", start: "top 70%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
   <section
        ref={section}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void"
      >
        {/* returning liquid energy */}
        <div
          ref={orb}
          className="pointer-events-none absolute h-[70vh] w-[70vh] rounded-full opacity-0 blur-[250px]"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, var(--creame), var(--color-accent-soft) 5%, var(--color-accent-strong) 0%, transparent 75%)",
          }}
        />

        <div
          data-close-block
          className="relative z-10 px-6 text-center"
        >
          <p data-close-line className="eyebrow mb-8">
            Chapter 08 — Vision for Tomorrow
          </p>
          <h2
            data-close-line
            className="display-xl text-[clamp(2.8rem,10vw,9rem)] text-vapor"
          >
            Fueling a
          </h2>
          <h2
            data-close-line
            className="display-xl bg-gradient-to-r from-ember via-ignite to-regen bg-clip-text text-[clamp(2.8rem,10vw,9rem)] italic text-transparent"
          >
            sustainable future.
          </h2>
          <p
            data-close-line
            className="mx-auto mt-10 max-w-md text-lg text-muted-vapor"
          >
            The future of energy is circular. We&apos;re already building it.
          </p>
        </div>
      </section>
  );
}
