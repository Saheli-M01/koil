// Single source of truth for all narrative copy.
// Keeping content here means the design stays consistent and copy never
// hardcodes system language - every line is written from the reader's side.

export const BRAND = {
  name: "Kanchan Oil Industries",
  short: "KOIL",
  tagline: "Fueling a sustainable future.",
  thesis: "We don't process waste. We complete the cycle.",
} as const;

export const SOLUTIONS = [
  {
    id: "biodiesel",
    index: "01",
    name: "Biodiesel",
    lede: "Drop-in fuel, drawn from what others discard.",
    body: "A renewable diesel synthesized from used cooking oil and waste fats. It runs in engines built today, with a fraction of the lifecycle carbon.",
    metric: "−84%",
    metricLabel: "lifecycle CO₂ vs. fossil diesel",
    tint: "var(--color-accent-strong)",
  },
  {
    id: "saf",
    index: "02",
    name: "SAF Feedstock",
    lede: "The groundwork for cleaner skies.",
    body: "Refined feedstock engineered to sustainable aviation fuel standards - the upstream foundation that lets aircraft fly on yesterday's waste.",
    metric: "1.4M+",
    metricLabel: "liters of feedstock capacity",
    tint: "var(--color-accent)",
  },
  {
    id: "ter",
    index: "03",
    name: "Trans-Esterification Residue",
    lede: "Nothing leaves the cycle.",
    body: "Even the byproduct becomes product. Our residue streams are recovered into glycerin and industrial inputs - closing the loop where most refining ends.",
    metric: "Zero",
    metricLabel: "waste sent downstream",
    tint: "var(--color-accent-soft)",
  },
] as const;

export const PRODUCTS = [
  {
    id: "biodiesel",
    index: "01",
    name: "Bio Diesel",
    tagline: "Multi-Feedstock Waste Derived Bio Fuel",
    description: "Multi-Feedstock Waste Derived Bio Fuel conforming to EN 14214 & ISCC",
    details: "A renewable diesel synthesized from used cooking oil and waste fats. It runs in engines built today, with a fraction of the lifecycle carbon.",
    image: "/product_1.png",
  },
  {
    id: "saf",
    index: "02",
    name: "Pre-Treated SAF Feedstock",
    tagline: "Sustainable Aviation Fuel Ready",
    description: "Waste/Residue based feedstock suitable for SAF / HVO (Class II, IV, Advanced) production",
    details: "Refined feedstock engineered to sustainable aviation fuel standards - the upstream foundation that lets aircraft fly on yesterday's waste.",
    image: "/product_2.png",
  },
  {
    id: "ter",
    index: "03",
    name: "Trans-Esterification Residue (TER)",
    tagline: "Complete Circle, Zero Waste",
    description: "Residue from the Trans Esterification process which can be further used as a fuel",
    details: "Even the byproduct becomes product. Our residue streams are recovered into glycerin and industrial inputs - closing the loop where most refining ends.",
    image: "/product_3.png",
  },
] as const;

export const INDUSTRIES = [
  {
    id: "road",
    name: "Road Transport",
    line: "Fleets that move freight without moving the climate backward.",
    desc: "Blended and pure biodiesel powering logistics, public transit, and long-haul fleets across the subcontinent.",
  },
  {
    id: "marine",
    name: "Marine",
    line: "Cleaner wakes across shipping lanes.",
    desc: "Marine-grade renewable fuel for vessels operating under tightening emissions regulation at sea.",
  },
  {
    id: "aviation",
    name: "Aviation",
    line: "The hardest sector to decarbonize. The one we're building for.",
    desc: "SAF-ready feedstock that puts circular fuel on the runway - supplying the supply chain of flight itself.",
  },
] as const;

export const CYCLE_STAGES = [
  { label: "Waste", note: "Used oils, fats, residue streams" },
  { label: "Recovery", note: "Collection & purification" },
  { label: "Transformation", note: "Trans-esterification" },
  { label: "Fuel", note: "Biodiesel & SAF feedstock" },
  { label: "Power", note: "Road · Marine · Aviation" },
  { label: "Renewal", note: "New opportunity, returned" },
] as const;

export const SUSTAINABILITY = [
  { value: "ISCC", label: "EU certified sustainable supply chain" },
  { value: "−84%", label: "Lifecycle carbon reduction per liter" },
  { value: "100%", label: "Feedstock from recovered waste streams" },
  { value: "0", label: "Net new fossil carbon introduced" },
] as const;

export const MANUFACTURING = [
  {
    k: "Precision",
    v: "Continuous-flow esterification with inline quality telemetry.",
  },
  {
    k: "Infrastructure",
    v: "Integrated collection, storage, and refining under one roof.",
  },
  {
    k: "Scale",
    v: "Industrial throughput engineered for export-grade consistency.",
  },
  {
    k: "Control",
    v: "Every batch traced, tested, and certified before it leaves.",
  },
] as const;
