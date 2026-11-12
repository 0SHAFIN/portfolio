"use client";

import { useEffect, useId, useRef } from "react";

export default function StoryByte({ expressive = false }: { expressive?: boolean }) {
  const id = useId().replaceAll(":", "");
  const portrait = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const element = portrait.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.idleActive = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <svg ref={portrait} className="story-byte" data-idle-active="false" viewBox="0 0 1280 1280" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Byte the explorer, ready for a new coding adventure</title>
      <defs>
        <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="1280">
          <rect width="1280" height="1280" fill="white" />
          <rect x="0" y="350" width="380" height="440" fill="black" />
        </mask>
        <clipPath id={`${id}-scarf`}><rect x="0" y="350" width="400" height="440" /></clipPath>
      </defs>
      <g className="story-scarf">
        <image href="/art/byte-explorer.webp" width="1280" height="1280" clipPath={`url(#${id}-scarf)`} />
      </g>
      <image href="/art/byte-explorer.webp" width="1280" height="1280" mask={`url(#${id}-body)`} />
      <g className="story-eyelids" shapeRendering="crispEdges">
        <path d="M785 370h92v119h-92zm155 25h84v118h-84z" fill="#10372e" />
        <path d="M801 430h61v13h-61zm155 20h52v13h-52z" fill="#9cdda0" />
      </g>
      {expressive && <g className="byte-flight-face" shapeRendering="crispEdges" transform="scale(1.02073365)">
        <path d="M782 367h100v126H782zm155 24h92v128h-92z" fill="#0c2e27" />
        <g className="byte-expression byte-expression-curious" fill="#9cdda0">
          <path d="M797 385h60v86h-60zm155 32h55v70h-55z" />
          <path d="M814 401h18v43h-18zm152 31h15v30h-15z" fill="#d6efbb" />
        </g>
        <g className="byte-expression byte-expression-happy" fill="#9cdda0">
          <path d="M796 421h14v-20h40v20h14v20h-15v-20h-39v20h-14zm153 22h14v-20h35v20h14v20h-14v-20h-35v20h-14z" />
          <path d="M862 492h16v14h37v-14h16v25h-14v12h-40v-12h-15z" />
        </g>
        <g className="byte-expression byte-expression-wink" fill="#9cdda0">
          <path d="M797 385h60v86h-60zm153 49h54v15h-54zm-88 58h16v14h37v-14h16v25h-14v12h-40v-12h-15z" />
          <path d="M813 400h18v44h-18z" fill="#d6efbb" />
        </g>
      </g>}
      <circle className="story-antenna-glow" cx="618" cy="76" r="62" fill="#ffc36b" />
    </svg>
  );
}
