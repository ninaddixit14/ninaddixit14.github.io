import { useEffect, useRef, useState } from "react";
import { mountHeroPlatformer } from "@/lib/hero-platformer.js";

export default function HeroPlatformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState({ found: 0, total: 6 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    return mountHeroPlatformer(canvas, hero, (found: number, total: number) => setCount({ found, total }));
  }, []);

  return <>
    <canvas ref={canvasRef} className="hero-canvas" tabIndex={0} role="img" aria-label="Playable platformer: a red-scarfed traveller crossing floating rocks at dusk. Use arrow keys or WASD to move and jump, or tap a destination." />
    <div className="hud"><div className="wrap">
      <span className="game-controls" aria-hidden="true">← → · ↑ <span>/</span> A D · W</span>
      <p className="count" aria-live="polite">{count.found === count.total ? `All ${count.total} lights found. Nicely done!` : `Lights found: ${count.found} / ${count.total}`}</p>
    </div></div>
  </>;
}