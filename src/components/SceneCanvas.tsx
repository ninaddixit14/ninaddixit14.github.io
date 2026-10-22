import { useEffect, useRef, type CSSProperties } from "react";
import { paintScene, type Shot } from "@/lib/scenes";

interface Props {
  shot: Shot;
  /** Animate continuously with mouse parallax (tracked on the parent element). */
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  /** Show playback controls (used only for the large view; thumbnails stay a still). */
  controls?: boolean;
}

const SceneCanvas = ({ shot, animate = false, className, style, ariaLabel }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const shotRef = useRef(shot);
  shotRef.current = shot;

  // Static paint + repaint on resize / shot change
  useEffect(() => {
    const cv = ref.current;
    if (!cv || animate) return;
    paintScene(cv, shot, 4, 0);
    const ro = new ResizeObserver(() => paintScene(cv, shotRef.current, 4, 0));
    ro.observe(cv);
    return () => ro.disconnect();
  }, [shot, animate]);

  // Animated loop with parallax
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !animate) return;
    const host = cv.parentElement ?? cv;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      paintScene(cv, shotRef.current, 4, 0);
      const ro = new ResizeObserver(() => paintScene(cv, shotRef.current, 4, 0));
      ro.observe(cv);
      return () => ro.disconnect();
    }
    let px = 0, tx = 0, visible = true, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    };
    host.addEventListener("pointermove", onMove);
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; });
    io.observe(cv);
    const t0 = performance.now();
    const loop = (now: number) => {
      if (visible) {
        px += (tx - px) * 0.05;
        paintScene(cv, shotRef.current, (now - t0) / 1000 + 4, px);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
    };
  }, [animate]);

  if (shot.p === "video") {
    if (!controls) {
      return (
        <img
          src={shot.poster}
          alt={ariaLabel ?? ""}
          className={className}
          style={style}
          loading="lazy"
          aria-hidden={ariaLabel ? undefined : true}
        />
      );
    }
    return (
      <video
        src={shot.src}
        poster={shot.poster}
        controls
        playsInline
        preload="none"
        className={className}
        style={style}
        aria-label={ariaLabel}
      />
    );
  }

  if (shot.p === "img") {
    return (
      <img
        src={shot.src}
        alt={ariaLabel ?? ""}
        className={className}
        style={style}
        loading="lazy"
        aria-hidden={ariaLabel ? undefined : true}
      />
    );
  }

  return (
    <canvas
      ref={ref}
      className={className}
      style={style}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
};

export default SceneCanvas;
