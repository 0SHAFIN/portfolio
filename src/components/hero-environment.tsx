"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type {
  createWorldRenderer,
  LightingMode,
  WorldOptions,
} from "./world-renderer";

type WorldController = Awaited<ReturnType<typeof createWorldRenderer>>;

export default function HeroEnvironment({
  paused,
  mode,
  deferred = false,
  priority = true,
}: {
  paused: boolean;
  mode: LightingMode;
  deferred?: boolean;
  priority?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<WorldController | null>(null);
  const options = useRef<WorldOptions>({ paused: false, mode: "auto" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    options.current = { paused, mode };
    controller.current?.setOptions(options.current);
    // A CSS crossfade is the fallback when WebGL is unavailable.
    if (!controller.current && canvas.current) {
      const portfolio =
        canvas.current.closest<HTMLElement>("[data-world-scope]") ||
        canvas.current.closest<HTMLElement>(".portfolio");
      portfolio?.style.setProperty("--night-mix", mode === "night" ? "1" : "0");
    }
  }, [paused, mode]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let cancelled = false;
    const portfolio =
      element.closest<HTMLElement>("[data-world-scope]") ||
      element.closest<HTMLElement>(".portfolio");
    const hero =
      element.closest<HTMLElement>("[data-world-scene]") ||
      element.closest<HTMLElement>(".hero");
    let previousLight = -1;
    let initialized = false;
    const initialize = () => {
      if (initialized || cancelled) return;
      initialized = true;
      import("./world-renderer")
        .then((module) => {
          if (cancelled) return null;
          return module.createWorldRenderer(
            element,
            options.current,
            (night, time) => {
              if (
                Math.abs(night - previousLight) > 0.003 ||
                ((night === 0 || night === 1) && night !== previousLight)
              ) {
                portfolio?.style.setProperty("--night-mix", night.toFixed(3));
                hero?.setAttribute(
                  "data-lighting",
                  night > 0.65 ? "night" : night > 0.15 ? "twilight" : "day",
                );
                previousLight = night;
              }
              hero?.style.setProperty("--world-time", time.toFixed(2));
            },
          );
        })
        .then((world) => {
          if (!world) return;
          if (cancelled) {
            world.dispose();
            return;
          }
          controller.current = world;
          world.setOptions(options.current);
          hero?.setAttribute("data-renderer", "webgl");
          setReady(true);
        })
        .catch(() => {
          if (cancelled) return;
          // Keep the original artwork visible when a browser cannot create a GPU context.
          hero?.setAttribute("data-renderer", "fallback");
          portfolio?.setAttribute("data-world-fallback", "true");
        });
    };
    let observer: IntersectionObserver | null = null;
    if (deferred) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect();
            initialize();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(element);
    } else initialize();
    return () => {
      cancelled = true;
      observer?.disconnect();
      controller.current?.dispose();
      controller.current = null;
      portfolio?.style.removeProperty("--night-mix");
    };
  }, [deferred]);

  return (
    <div className={`hero-world-scene${ready ? " world-ready" : ""}`}>
      <Image
        src="/art/adventure-valley.webp"
        alt=""
        fill
        priority={priority}
        unoptimized
        sizes="100vw"
      />
      <div className="world-fallback-night" aria-hidden="true" />
      <canvas ref={canvas} className="world-canvas" aria-hidden="true" />
    </div>
  );
}
