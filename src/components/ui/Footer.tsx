import { BRAND } from "@/lib/content";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="border-t py-16"
      style={{
        borderColor: "var(--slate-gray)",
        backgroundColor: "var(--slate-gray)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-center md:px-10">
        <div className="flex-1">
          <div className="mb-6">
            <Image
              src="/logo.webp"
              alt={BRAND.name}
              width={120}
              height={40}
              className="h-auto w-32"
              priority
            />
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--creame)", opacity: 0.85 }}
          >
            {BRAND.name} — {BRAND.thesis}
          </p>
        </div>

        <div
          className="flex gap-12 font-mono text-xs uppercase tracking-[0.2em] md:gap-16"
          style={{ color: "var(--creame)" }}
        >
          <div className="flex flex-col gap-3">
            <a
              href="#solutions"
              className="transition-opacity hover:opacity-60"
            >
              Solutions
            </a>
            <a
              href="#industries"
              className="transition-opacity hover:opacity-60"
            >
              Industries
            </a>
            <a
              href="#sustainability"
              className="transition-opacity hover:opacity-60"
            >
              Sustainability
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-60">
              Contact
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span style={{ opacity: 0.7 }}>ISCC Certified</span>
            <span style={{ opacity: 0.7 }}>Kolkata · India</span>
            <span style={{ opacity: 0.7 }}>© {new Date().getFullYear()} KOIL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
