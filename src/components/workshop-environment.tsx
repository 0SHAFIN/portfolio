"use client";

import { useEffect, useRef } from "react";
import type { createWorkshopRenderer } from "./workshop-renderer";

type WorkshopController = Awaited<ReturnType<typeof createWorkshopRenderer>>;

export default function WorkshopEnvironment({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<WorkshopController | null>(null);
  const options = useRef(paused);

  useEffect(() => {
    options.current = paused;
    controller.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const root = element.closest<HTMLElement>(".finale-world");
    let cancelled = false;
    let initialized = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || initialized) return;
      initialized = true;
      observer.disconnect();
      import("./workshop-renderer")
        .then((module) => cancelled ? null : module.createWorkshopRenderer(
          element, options.current,
          (time) => root?.style.setProperty("--workshop-time", time.toFixed(3)),
        ))
        .then((world) => {
          if (!world) return;
          if (cancelled) { world.dispose(); return; }
          controller.current = world;
          world.setPaused(options.current);
          root?.setAttribute("data-workshop-renderer", "webgl");
        })
        .catch(() => {
          if (!cancelled) root?.setAttribute("data-workshop-renderer", "fallback");
        });
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      controller.current?.dispose();
      controller.current = null;
      root?.removeAttribute("data-workshop-renderer");
    };
  }, []);

  return <canvas ref={canvas} className="workshop-canvas" aria-hidden="true" />;
}
