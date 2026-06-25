"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Transformation", href: "#waste" },
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Cycle", href: "#cycle" },
  { label: "Sustainability", href: "#sustainability" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

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
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
          className="group flex items-center gap-3"
        >
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
              onClick={(e) => handleLinkClick(e, l.href)}
              className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-slate-gray border-b border-transparent font-medium transition-colors hover:text-slate-gray hover:border-slate-gray"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, "#contact")}
          className="hidden rounded-full border border-slate-gray/20 bg-slate-gray px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-creame transition-all hover:bg-slate-gray/90 md:inline-block"
        >
          Partner with us
        </a>

        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex items-center justify-center rounded-full border border-slate-gray/20 p-2 text-slate-gray md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-slate-gray/10 bg-creame md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-slate-gray/80 font-medium transition-colors hover:text-slate-gray"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="rounded-full border border-slate-gray/20 bg-slate-gray px-5 py-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-creame transition-all hover:bg-slate-gray/90"
              >
                Partner with us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
