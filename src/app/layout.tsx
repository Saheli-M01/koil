import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOIL - Fueling a Sustainable Future",
  description:
    "Kanchan Oil Industries transforms waste streams into sustainable fuel for road, marine, and aviation. Energy is not consumed c- it is transformed.",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  keywords: [
    "sustainable fuel",
    "biodiesel",
    "SAF feedstock",
    "circular energy",
    "waste to fuel",
    "Kanchan Oil Industries",
  ],
  openGraph: {
    title: "KOIL c- Fueling a Sustainable Future",
    description:
      "Waste becomes fuel. Fuel powers industries. The future of energy is circular.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b493a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain bg-void text-vapor antialiased">{children}</body>
    </html>
  );
}
