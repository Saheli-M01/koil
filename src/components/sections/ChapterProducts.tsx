"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/lib/content";
import Image from "next/image";

export default function ChapterProducts() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const t = track.current;
    if (!el || !t) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-product]");
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
          p.querySelector("[data-product-content]"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              containerAnimation: gsap.getById("products") as never,
              start: "left center",
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={section}
      className="relative overflow-hidden bg-void"
    >
      <div ref={track} className="flex h-screen w-max">
        {/* Intro panel with product_0 background */}
        <div className="relative flex h-screen w-screen flex-col justify-center overflow-hidden px-6 md:px-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/product_0.png"
              alt="KOIL Products"
              fill
              className="object-cover "
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent" />
          </div>
          <div className="relative z-10">
            <p className="eyebrow mb-6">Chapter 04 - Our Products</p>
            <h2 className="display-xl max-w-3xl text-[clamp(2.4rem,7vw,6rem)] text-vapor">
              Transforming waste into sustainable energy solutions.
            </h2>
            <p className="mt-8 max-w-md text-muted-vapor">
              Scroll through our product range - each engineered for a circular
              future, each closing the loop on waste.
            </p>
          </div>
        </div>

        {/* Product slides */}
        {PRODUCTS.map((product, i) => (
          <article
            key={product.id}
            data-product
            className="relative flex h-screen w-screen flex-col justify-center overflow-hidden px-6 md:px-20"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover "
              />
              <div className="absolute inset-0 bg-gradient-to-br from-void/95 via-void/85 to-void/70" />
            </div>

          

            {/* Content */}
            <div data-product-content className="relative z-10 max-w-3xl">
              <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.3em] text-ember">
                Product {product.index}
              </span>
              <h3 className="display-xl mb-6 text-[clamp(2.2rem,6vw,5rem)] text-vapor">
                {product.name}
              </h3>
              <p className="mb-6 text-xl font-medium text-ignite">
                {product.tagline}
              </p>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-vapor">
                {product.description}
              </p>
              <p className="max-w-lg text-base leading-relaxed opacity-80"
                style={{ color: "var(--color-accent-soft)" }}
              >
                {product.details}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
