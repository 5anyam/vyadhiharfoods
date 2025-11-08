// components/Whatsapp.tsx
"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";

const PHONE = "917428408825"; // international format, no +, spaces or dashes

function buildWaLink(baseMsg: string) {
  // Encode and include current page URL for context
  const url = typeof window !== "undefined" ? window.location.href : "";
  const msg = `${baseMsg}${url ? `%0A%0APage:%20${encodeURIComponent(url)}` : ""}`;
  return `https://wa.me/${PHONE}?text=${msg}`;
}

export default function Whatsapp() {
  const href = useMemo(
    () => buildWaLink(encodeURIComponent("Hello EDA Perfumes – I’d like to know more about: ")),
    []
  );

  return (
    <div
      className="fixed z-40"
      style={{ bottom: 110, right: 24 }}
      aria-live="polite"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        // Optional tracking hooks
        data-cta="whatsapp-fab"
        data-channel="whatsapp"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-xl ring-2 ring-emerald-300/50 animate-ping" />

        {/* Button */}
        <span
          className="
            relative inline-flex h-12 w-12 items-center justify-center rounded-xl
            bg-emerald-500 text-white shadow-lg shadow-emerald-500/20
            transition-all duration-300
            hover:translate-y-[-2px] hover:shadow-xl hover:shadow-emerald-500/30
            active:translate-y-0
            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
            dark:shadow-emerald-400/10 dark:hover:shadow-emerald-400/20
          "
        >
          <IconBrandWhatsapp className="h-6 w-6" aria-hidden="true" />
        </span>
      </Link>

      {/* Small helper label (optional) */}
      <div
        className="
          pointer-events-none mt-2 select-none rounded-md px-2 py-1 text-xs
          text-neutral-600/80 bg-white/70 backdrop-blur border border-neutral-200
          shadow-sm
          dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-800
        "
        style={{ width: "fit-content" }}
      >
        WhatsApp
      </div>
    </div>
  );
}
