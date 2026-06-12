"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/content";

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
        }
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
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={section}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void"
      >
        {/* returning liquid energy */}
        <div
          ref={orb}
          className="pointer-events-none absolute h-[70vh] w-[70vh] rounded-full opacity-0 blur-[40px]"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, var(--creame), var(--color-accent-soft) 35%, var(--color-accent-strong) 60%, transparent 75%)",
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

      {/* CTA */}
      <section
        id="contact"
        className="relative border-t border-white/[0.06] bg-gradient-to-b from-void to-carbon py-32 md:py-48"
      >
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-10">
          <h2 className="display-xl mx-auto max-w-4xl text-[clamp(2.2rem,6vw,5.5rem)] text-vapor">
            Let&apos;s build the next energy revolution.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-vapor">
            Whether you move freight, ships, or aircraft — there&apos;s a
            circular fuel pathway with your name on it.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:partner@koil.example"
              className="group relative overflow-hidden rounded-full bg-ignite px-9 py-4 font-mono text-sm uppercase tracking-[0.2em] text-void transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Partner with KOIL</span>
            </a>
            <a
              href="#top"
              className="rounded-full border border-white/15 px-9 py-4 font-mono text-sm uppercase tracking-[0.2em] text-vapor transition-colors hover:border-ember hover:text-ignite"
            >
              Replay the story
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-void py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-end md:px-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ember" />
              <span className="font-display text-2xl text-vapor">
                {BRAND.short}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-vapor">
              {BRAND.name} — {BRAND.thesis}
            </p>
          </div>
          <div className="flex gap-12 font-mono text-xs uppercase tracking-[0.2em] text-muted-vapor">
            <div className="flex flex-col gap-3">
              <a href="#solutions" className="hover:text-vapor">
                Solutions
              </a>
              <a href="#industries" className="hover:text-vapor">
                Industries
              </a>
              <a href="#sustainability" className="hover:text-vapor">
                Sustainability
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-vapor">ISCC Certified</span>
              <span>Kolkata · India</span>
              <span>© {new Date().getFullYear()} KOIL</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
