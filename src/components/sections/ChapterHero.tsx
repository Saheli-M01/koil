"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ChapterHero() {
  const section = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        intro.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.25,
      )
        .to(overlay.current, { opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(
          line1.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.35,
        )
        .fromTo(
          line2.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.6,
        )
        .to(sceneWrap.current, { scale: 1.05, duration: 1 }, 0.3);
    }, el); // <- THIS WAS MISSING

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked in some browsers; the poster/frame still works.
      });
    }
  }, []);

  return (
    <section
      id="top"
      ref={section}
      className="relative h-screen overflow-hidden"
    >
      {/* atmospheric gradient field */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-panel)_0%,var(--color-bg)_72%)]" />

      {/* hero video */}
      <div
        ref={sceneWrap}
        className="absolute inset-0 flex items-center justify-center"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-75 mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* darkening overlay — fades in as the statement appears */}
      <div
        ref={overlay}
        className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75"
      />

      {/* permanent vignette for edge contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />

      {/* intro eyebrow */}
      <div
        ref={intro}
        className="absolute left-1/2 top-[18%] -translate-x-1/2 text-center opacity-0"
      >
        <p className="eyebrow mb-4">Chapter 01 — Energy Never Disappears</p>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-vapor">
          KANCHAN OIL INDUSTRIES
        </p>
      </div>

      {/* The statement */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div
          ref={line1}
          className="display-xl text-[clamp(2.8rem,9vw,8rem)] text-creame opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <h1>Energy is not consumed.</h1>
        </div>

        <div
          ref={line2}
          className="mt-12 display-xl bg-gradient-to-r from-creame via-ignite to-regen bg-clip-text text-[clamp(2.8rem,9vw,8rem)] italic text-transparent opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <h1> It is transformed.</h1>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow">Scroll</span>
          <span className="h-10 w-[1px] animate-pulse bg-gradient-to-b from-ignite to-transparent" />
        </div>
      </div>
    </section>
  );
}
