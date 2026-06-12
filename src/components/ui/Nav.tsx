"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Transformation", href: "#waste" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Cycle", href: "#cycle" },
  { label: "Sustainability", href: "#sustainability" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-slate-gray/10 transition-colors duration-500 bg-creame",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-0 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="KOIL logo"
            width={36}
            height={36}
            priority
            className="h-16 w-16 object-contain"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate-gray transition-colors hover:text-slate-gray"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-slate-gray/20 bg-slate-gray px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-creame transition-all hover:bg-slate-gray/90"
        >
          Partner with us
        </a>
      </nav>
    </motion.header>
  );
}
