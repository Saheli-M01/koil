"use client";

import { useEffect, useState } from "react";

/** Returns whether the device should render heavy 3D, balancing perf & a11y. */
export function useCanRender3D() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(
        c.getContext("webgl2") || c.getContext("webgl")
      );
    } catch {
      webgl = false;
    }
    // Skip 3D on very small viewports to protect mobile perf / battery.
    const bigEnough = window.innerWidth > 640;
    setOk(webgl && !reduced && bigEnough);
  }, []);

  return ok;
}
