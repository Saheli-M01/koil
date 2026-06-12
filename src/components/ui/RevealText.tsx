"use client";

import { useRef, useLayoutEffect, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/**
 * Splits text into words and reveals them on scroll. A text-mask effect that
 * makes statements feel typed by the scroll itself rather than just faded in.
 */
export default function RevealText({
  children,
  as: Tag = "h2",
  className,
  stagger = 0.06,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = el.querySelectorAll("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <Tag ref={ref as never} className={cn(className)} aria-label={children}>
      {children.split(" ").map((word, i) => (
        <span key={i} aria-hidden className="overflow-hidden">
          <span data-word className="inline-block leading-[1.2]">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}
