/* Procedural key art + real screenshots. Ported from the original HTML design. */
export type Shot =
  | { p: "img"; src: string; fit?: "cover" | "contain" }
  | { p: "video"; src: string; poster: string }
  | { p: "dusk"; seed: number; sun: number }
  | { p: "ember"; seed: number; fx: number }
  | { p: "gray"; seed: number; z: number }
  | { p: "attract"; seed: number };

type C = CanvasRenderingContext2D;

function rng(s: number) {
  s = s % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const TAU = Math.PI * 2;

type RidgeParams = { p1: number; p2: number; p3: number; f1: number; f2: number; f3: number };

function ridgeParams(r: () => number): RidgeParams {
  return { p1: r() * TAU, p2: r() * TAU, p3: r() * TAU, f1: 1 + r() * 2, f2: 3 + r() * 4, f3: 9 + r() * 8 };
}
/** Height of a ridge layer at screen x, so figures can be drawn standing on it. */
function ridgeY(x: number, w: number, h: number, base: number, amp: number, P: RidgeParams, shift: number) {
  const u = (x + shift) / w;
  const n = 0.55 * Math.sin(u * P.f1 * TAU + P.p1) + 0.3 * Math.sin(u * P.f2 * TAU + P.p2) + 0.15 * Math.sin(u * P.f3 * TAU + P.p3);
  return h * base - (h * amp * (n + 1)) / 2;
}
const wrap = (v: number, m: number) => ((v % m) + m) % m;

function ridge(c: C, w: number, h: number, base: number, amp: number, col: string, r: () => number, shift: number) {
  const P = ridgeParams(r);
  c.beginPath(); c.moveTo(0, h);
  for (let x = 0; x <= w + 8; x += 6) c.lineTo(x, ridgeY(x, w, h, base, amp, P, shift));
  c.lineTo(w, h); c.closePath(); c.fillStyle = col; c.fill();
  return P;
}
function vignette(c: C, w: number, h: number, k: number) {
  const g = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0," + k + ")");
  c.fillStyle = g; c.fillRect(0, 0, w, h);
}

function dusk(c: C, w: number, h: number, s: Extract<Shot, { p: "dusk" }>, t: number, px: number) {
  const r = rng(s.seed);
  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#0e0b28"); g.addColorStop(0.42, "#43205f"); g.addColorStop(0.68, "#c9573f"); g.addColorStop(0.8, "#f39a5b"); g.addColorStop(1, "#2a1230");
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 140; i++) { const sx = r() * w, sy = r() * h * 0.45, a = r() * 0.7 * (1 - sy / (h * 0.45)); c.fillStyle = "rgba(255,255,255," + a + ")"; c.fillRect(sx, sy, 1.4, 1.4); }
  const sunX = w * s.sun - px * 10, sunY = h * 0.5;
  const sg = c.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.6);
  sg.addColorStop(0, "rgba(255,190,120,.75)"); sg.addColorStop(0.25, "rgba(255,130,90,.25)"); sg.addColorStop(1, "rgba(255,120,90,0)");
  c.fillStyle = sg; c.fillRect(0, 0, w, h);
  c.fillStyle = "#ffe2b8"; c.beginPath(); c.arc(sunX, sunY, h * 0.06, 0, TAU); c.fill();
  const L: [number, number, string][] = [[0.6, 0.16, "#6a2f6c"], [0.66, 0.16, "#47205a"], [0.74, 0.16, "#2b1340"], [0.84, 0.12, "#170a26"]];
  for (let i = 0; i < L.length; i++) {
    ridge(c, w, h, L[i][0], L[i][1], L[i][2], r, px * (i + 1) * 14 + t * (i + 1) * 3);
    if (i === 1) { const fg = c.createLinearGradient(0, h * 0.55, 0, h * 0.8); fg.addColorStop(0, "rgba(240,130,110,0)"); fg.addColorStop(0.6, "rgba(240,130,110,.22)"); fg.addColorStop(1, "rgba(240,130,110,0)"); c.fillStyle = fg; c.fillRect(0, h * 0.5, w, h * 0.35); }
  }
  const pw = w * 0.07;
  for (let i = 0; i < 6; i++) {
    const x = w * (0.04 + i * 0.18) + r() * w * 0.04 - px * 30, top = h * (0.76 + r() * 0.1);
    c.fillStyle = "#0a0514"; c.fillRect(x, top, pw, h - top);
    c.save(); c.shadowColor = "#5ef2ff"; c.shadowBlur = 14; c.strokeStyle = "#5ef2ff"; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x, top); c.lineTo(x + pw, top); c.stroke();
    c.lineWidth = 1.2; c.globalAlpha = 0.7;
    const lx = x + pw * (0.25 + r() * 0.5); c.beginPath(); c.moveTo(lx, top); c.lineTo(lx, top + h * 0.05); c.lineTo(lx + pw * 0.2, top + h * 0.07); c.lineTo(lx + pw * 0.2, h); c.stroke();
    c.fillStyle = "#5ef2ff"; c.fillRect(lx - 3, top + h * 0.05 - 3, 6, 6);
    c.restore();
    if (i === 2) {
      const cx = x + pw * 0.5, ch = h * 0.045;
      c.fillStyle = "#0a0514"; c.fillRect(cx - ch * 0.22, top - ch, ch * 0.44, ch); c.beginPath(); c.arc(cx, top - ch - ch * 0.2, ch * 0.22, 0, TAU); c.fill();
      c.save(); c.shadowColor = "#5ef2ff"; c.shadowBlur = 10; c.fillStyle = "#5ef2ff"; c.fillRect(cx + ch * 0.02, top - ch * 1.25, ch * 0.12, ch * 0.06); c.restore();
    }
  }
  for (let i = 0; i < 46; i++) {
    const bx = r() * w, sp = 10 + r() * 30, ph = r() * h;
    const y = h - ((ph + t * sp) % h), xx = bx + Math.sin(t * 0.8 + i) * 12;
    c.fillStyle = "rgba(94,242,255," + (0.25 + 0.5 * (y / h)) + ")"; c.fillRect(xx, y, 2, 2);
  }
  vignette(c, w, h, 0.55);
}

function ember(c: C, w: number, h: number, s: Extract<Shot, { p: "ember" }>, t: number, px: number) {
  const r = rng(s.seed);
  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#0b0405"); g.addColorStop(0.5, "#2a0909"); g.addColorStop(0.76, "#8a210d"); g.addColorStop(0.86, "#e2621c"); g.addColorStop(1, "#140404");
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 7; i++) { const mx = r() * w, my = h * (0.2 + r() * 0.4), mr = h * (0.2 + r() * 0.3); const sg = c.createRadialGradient(mx, my, 0, mx, my, mr); sg.addColorStop(0, "rgba(60,30,30,.35)"); sg.addColorStop(1, "rgba(60,30,30,0)"); c.fillStyle = sg; c.fillRect(0, 0, w, h); }
  const ruins = (base: number, col: string, n: number, maxH: number, shift: number) => {
    c.fillStyle = col;
    for (let k = 0; k < n; k++) {
      const x = r() * w * 1.1 - w * 0.05 - shift, tw = w * (0.03 + r() * 0.06), th = h * (0.12 + r() * maxH), b = h * base;
      c.beginPath(); c.moveTo(x, h); c.lineTo(x, b - th); c.lineTo(x + tw * 0.3, b - th + h * 0.03 * r()); c.lineTo(x + tw * 0.55, b - th - h * 0.03 * r()); c.lineTo(x + tw * 0.8, b - th + h * 0.05 * r()); c.lineTo(x + tw, b - th * (0.6 + r() * 0.3)); c.lineTo(x + tw, h); c.fill();
      if (r() > 0.4) { c.fillStyle = "rgba(255,120,40,.35)"; c.fillRect(x + tw * 0.35, b - th * 0.6, tw * 0.12, h * 0.02); c.fillStyle = col; }
    }
  };
  ruins(0.86, "#3d0f0b", 9, 0.3, px * 12);
  ridge(c, w, h, 0.86, 0.06, "#2a0807", r, px * 20);
  ruins(0.95, "#160404", 6, 0.38, px * 26);
  ridge(c, w, h, 0.97, 0.1, "#070202", r, px * 34);
  const fx = w * s.fx - px * 40, fy = h * 0.9, fh = h * 0.2;
  c.fillStyle = "#050101";
  c.beginPath(); c.moveTo(fx - fh * 0.28, fy); c.lineTo(fx - fh * 0.08, fy - fh * 0.8); c.lineTo(fx + fh * 0.1, fy - fh * 0.8); c.lineTo(fx + fh * 0.3, fy); c.fill();
  c.beginPath(); c.arc(fx, fy - fh * 0.9, fh * 0.1, 0, TAU); c.fill();
  c.save(); c.shadowColor = "#ff7a2a"; c.shadowBlur = 18; c.strokeStyle = "#ffa45c"; c.lineWidth = Math.max(2, fh * 0.02);
  c.beginPath(); c.moveTo(fx + fh * 0.12, fy - fh * 0.5); c.lineTo(fx + fh * 0.62, fy - fh * 0.02); c.stroke(); c.restore();
  for (let i = 0; i < 90; i++) {
    const ex = r() * w, sp = 12 + r() * 40, ph = r() * h, ey = h - ((ph + t * sp) % h), drift = Math.sin(t * 0.6 + i) * 18;
    c.fillStyle = i % 3 ? "rgba(255," + (110 + ((i * 7) % 90)) + ",40," + (0.3 + (0.6 * ey) / h) + ")" : "rgba(180,170,170,.35)";
    c.fillRect(ex + drift, i % 3 ? ey : h - ey, i % 3 ? 2.2 : 1.6, i % 3 ? 2.2 : 1.6);
  }
  vignette(c, w, h, 0.7);
}

function gray(c: C, w: number, h: number, s: Extract<Shot, { p: "gray" }>, _t: number, px: number) {
  const r = rng(s.seed);
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#2a3346"); g.addColorStop(1, "#0b0e15");
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  const N = 14, S = w / (24 + s.z * 4), cx = w * 0.5 - px * 20, cy = h * (0.18 - s.z * 0.03);
  const P = (x: number, y: number, z: number): [number, number] => [cx + (x - y) * S, cy + (x + y) * S * 0.5 - z * S];
  c.strokeStyle = "rgba(150,170,210,.16)"; c.lineWidth = 1;
  for (let i = 0; i <= N; i++) { const a = P(i, 0, 0), b = P(i, N, 0), d = P(0, i, 0), e = P(N, i, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.moveTo(d[0], d[1]); c.lineTo(e[0], e[1]); c.stroke(); }
  type B = { x: number; y: number; a: number; b: number; hz: number; goal?: boolean };
  const blocks: B[] = [];
  for (let i = 0; i < 18; i++) blocks.push({ x: Math.floor(r() * (N - 2)), y: Math.floor(r() * (N - 2)), a: 1 + Math.floor(r() * 3), b: 1 + Math.floor(r() * 3), hz: [0.5, 1, 1, 2, 3][Math.floor(r() * 5)] });
  blocks.push({ x: 6, y: 6, a: 1, b: 1, hz: 1, goal: true });
  blocks.sort((m, n) => m.x + m.y + m.a + m.b - (n.x + n.y + n.a + n.b));
  const poly = (pts: [number, number][], col: string) => { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let k = 1; k < pts.length; k++) c.lineTo(pts[k][0], pts[k][1]); c.closePath(); c.fillStyle = col; c.fill(); c.strokeStyle = "rgba(0,0,0,.25)"; c.stroke(); };
  c.save(); c.setLineDash([6, 8]); c.strokeStyle = "rgba(255,140,60,.8)"; c.lineWidth = 2; c.beginPath();
  const rt = [[1, 12], [4, 9], [4, 6], [6.5, 6.5]];
  for (let i = 0; i < rt.length; i++) { const q = P(rt[i][0], rt[i][1], 0); if (i) c.lineTo(q[0], q[1]); else c.moveTo(q[0], q[1]); }
  c.stroke(); c.restore();
  blocks.forEach((k) => {
    const top = k.goal ? "#ffb070" : "#cfd5e1", lf = k.goal ? "#e57a2e" : "#8c95a8", rt2 = k.goal ? "#a8501a" : "#5c6578";
    poly([P(k.x, k.y + k.b, 0), P(k.x + k.a, k.y + k.b, 0), P(k.x + k.a, k.y + k.b, k.hz), P(k.x, k.y + k.b, k.hz)], lf);
    poly([P(k.x + k.a, k.y, 0), P(k.x + k.a, k.y + k.b, 0), P(k.x + k.a, k.y + k.b, k.hz), P(k.x + k.a, k.y, k.hz)], rt2);
    poly([P(k.x, k.y, k.hz), P(k.x + k.a, k.y, k.hz), P(k.x + k.a, k.y + k.b, k.hz), P(k.x, k.y + k.b, k.hz)], top);
  });
  const pl = P(1, 12, 0); c.save(); c.shadowColor = "#5ef2ff"; c.shadowBlur = 16; c.fillStyle = "#5ef2ff"; c.fillRect(pl[0] - S * 0.12, pl[1] - S * 0.8, S * 0.24, S * 0.8); c.restore();
  const lg = c.createRadialGradient(w * 0.25, 0, 0, w * 0.25, 0, w); lg.addColorStop(0, "rgba(180,200,255,.18)"); lg.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = lg; c.fillRect(0, 0, w, h);
  vignette(c, w, h, 0.6);
}

/* Attract mode: the dusk world plays itself. A traveller crosses the ridges on
   its own and the lanterns it passes flare up – no keyboard, no touch, no input. */
function traveller(c: C, x: number, y: number, ht: number, t: number) {
  const ph = t * 6;
  c.save();
  c.fillStyle = "rgba(0,0,0,.35)";
  c.beginPath(); c.ellipse(x, y, ht * 0.17, ht * 0.045, 0, 0, TAU); c.fill();
  c.translate(x, y); c.scale(ht, ht);
  c.translate(0, -Math.abs(Math.sin(ph)) * 0.035);
  c.lineCap = "round"; c.lineJoin = "round";
  c.strokeStyle = "#04030a"; c.lineWidth = 0.11;
  c.beginPath(); c.moveTo(0, -0.44); c.lineTo(Math.sin(ph) * 0.2, -0.01); c.stroke();
  c.beginPath(); c.moveTo(0, -0.44); c.lineTo(Math.sin(ph + Math.PI) * 0.2, -0.01); c.stroke();
  c.fillStyle = "#04030a";
  c.beginPath(); c.moveTo(-0.11, -0.44); c.lineTo(0.11, -0.44); c.lineTo(0.08, -0.8); c.lineTo(-0.08, -0.8); c.closePath(); c.fill();
  c.fillRect(-0.19, -0.76, 0.09, 0.26);
  c.beginPath(); c.arc(0.01, -0.9, 0.1, 0, TAU); c.fill();
  c.lineWidth = 0.075;
  c.beginPath(); c.moveTo(0.01, -0.74); c.lineTo(Math.sin(ph + Math.PI) * 0.16 + 0.05, -0.5); c.stroke();
  c.save(); c.shadowColor = "#5ef2ff"; c.shadowBlur = 10; c.strokeStyle = "#5ef2ff"; c.lineWidth = 0.055;
  c.beginPath(); c.moveTo(-0.02, -0.84);
  for (let k = 1; k <= 6; k++) {
    const u = k / 6;
    c.lineTo(-0.06 - u * 0.5, -0.84 + Math.sin(ph * 1.2 - u * 3.4) * 0.06 + u * 0.12);
  }
  c.stroke(); c.restore();
  c.restore();
}

function attract(c: C, w: number, h: number, s: Extract<Shot, { p: "attract" }>, t: number, px: number) {
  const r = rng(s.seed);
  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#04050d"); g.addColorStop(0.34, "#12122f"); g.addColorStop(0.6, "#38215a");
  g.addColorStop(0.78, "#7b3c5c"); g.addColorStop(0.88, "#c4685a"); g.addColorStop(1, "#170d20");
  c.fillStyle = g; c.fillRect(0, 0, w, h);

  for (let i = 0; i < 150; i++) {
    const sx = r() * w, sy = r() * h * 0.52, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.3 + r() * 0.6) + i));
    c.fillStyle = "rgba(255,255,255," + ((1 - sy / (h * 0.52)) * 0.75 * tw).toFixed(3) + ")";
    c.fillRect(sx - px * 5, sy, 1.5, 1.5);
  }

  const mx = w * 0.8 - px * 10, my = h * 0.16;
  const mg = c.createRadialGradient(mx, my, 0, mx, my, h * 0.26);
  mg.addColorStop(0, "rgba(190,215,255,.3)"); mg.addColorStop(1, "rgba(190,215,255,0)");
  c.fillStyle = mg; c.fillRect(0, 0, w, h);
  c.fillStyle = "#e6eeff"; c.beginPath(); c.arc(mx, my, h * 0.032, 0, TAU); c.fill();
  c.fillStyle = "rgba(120,145,190,.4)"; c.beginPath(); c.arc(mx - h * 0.011, my + h * 0.009, h * 0.009, 0, TAU); c.fill();

  const gx = w * 0.3 - px * 7, gy = h * 0.84;
  const sg = c.createRadialGradient(gx, gy, 0, gx, gy, h * 0.5);
  sg.addColorStop(0, "rgba(255,150,90,.55)"); sg.addColorStop(0.4, "rgba(255,110,80,.16)"); sg.addColorStop(1, "rgba(255,110,80,0)");
  c.fillStyle = sg; c.fillRect(0, 0, w, h);

  for (let i = 0; i < 6; i++) {
    const by = h * (0.26 + r() * 0.32), bw = w * (0.16 + r() * 0.26), sp = 3 + r() * 7;
    const bx = wrap(t * sp + r() * (w + bw), w + bw * 2) - bw;
    const bg = c.createLinearGradient(bx, 0, bx + bw, 0);
    bg.addColorStop(0, "rgba(255,190,200,0)");
    bg.addColorStop(0.5, "rgba(255,190,200," + (0.05 + r() * 0.07).toFixed(3) + ")");
    bg.addColorStop(1, "rgba(255,190,200,0)");
    c.fillStyle = bg; c.fillRect(bx, by, bw, h * (0.005 + r() * 0.011));
  }

  const L: [number, number, string][] = [[0.6, 0.15, "#4a2a66"], [0.68, 0.16, "#311b4e"], [0.77, 0.13, "#1d1034"]];
  for (let i = 0; i < L.length; i++) ridge(c, w, h, L[i][0], L[i][1], L[i][2], r, px * (i + 1) * 12 + t * (i + 1) * 2);

  for (let i = 0; i < 4; i++) {
    const iw = w * (0.045 + r() * 0.05);
    const ix = wrap(r() * (w + iw * 2) - t * 6, w + iw * 2) - iw;
    const iy = h * (0.44 + r() * 0.18) + Math.sin(t * 0.7 + i * 1.9) * h * 0.01;
    c.fillStyle = "#0c0620";
    c.beginPath(); c.moveTo(ix - iw * 0.5, iy); c.lineTo(ix + iw * 0.5, iy);
    c.lineTo(ix + iw * 0.18, iy + iw * 0.62); c.lineTo(ix - iw * 0.22, iy + iw * 0.4);
    c.closePath(); c.fill();
    c.fillStyle = "#241540"; c.fillRect(ix - iw * 0.5, iy - iw * 0.09, iw, iw * 0.09);
    c.save(); c.shadowColor = "#5ef2ff"; c.shadowBlur = 14; c.fillStyle = "#5ef2ff";
    c.beginPath(); c.moveTo(ix + iw * 0.06, iy - iw * 0.5); c.lineTo(ix + iw * 0.2, iy - iw * 0.1); c.lineTo(ix - iw * 0.08, iy - iw * 0.1); c.closePath(); c.fill();
    c.restore();
  }

  const fgBase = 0.93, fgAmp = 0.09, fgShift = px * 46 + t * 22;
  const FG = ridge(c, w, h, fgBase, fgAmp, "#060311", r, fgShift);
  const wx = wrap(t * 44, w + 240) - 120;

  for (let i = 0; i < 6; i++) {
    const lx = wrap(w * (0.06 + i * 0.16) - t * 22, w + 120) - 60;
    const ly = ridgeY(lx, w, h, fgBase, fgAmp, FG, fgShift) - h * (0.05 + (i % 3) * 0.018) + Math.sin(t * 1.1 + i * 2) * h * 0.006;
    const near = Math.max(0, 1 - Math.abs(lx - wx) / (w * 0.07));
    const glow = Math.min(1, 0.4 + 0.3 * Math.sin(t * 2.2 + i) + near * 0.6);
    c.save(); c.shadowColor = "#ffd59e"; c.shadowBlur = 16 + near * 14;
    c.fillStyle = "rgba(255,213,158," + glow.toFixed(3) + ")";
    c.beginPath(); c.arc(lx, ly, h * 0.008, 0, TAU); c.fill();
    c.restore();
  }

  traveller(c, wx, ridgeY(wx, w, h, fgBase, fgAmp, FG, fgShift), h * 0.085, t);

  for (let i = 0; i < 54; i++) {
    const ex = r() * w, sp = 9 + r() * 24, ph = r() * h * 0.7;
    const y = h - ((ph + t * sp) % (h * 0.7));
    c.fillStyle = "rgba(94,242,255," + (0.14 + 0.42 * (y / h)).toFixed(3) + ")";
    c.fillRect(ex + Math.sin(t * 0.7 + i) * 10 - px * 18, y, 2, 2);
  }
  vignette(c, w, h, 0.62);
}

export function paintScene(cv: HTMLCanvasElement, shot: Shot, t = 0, px = 0) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5), w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext("2d");
  if (!c) return;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (shot.p === "dusk") dusk(c, w, h, shot, t, px);
  else if (shot.p === "ember") ember(c, w, h, shot, t, px);
  else if (shot.p === "gray") gray(c, w, h, shot, t, px);
}
