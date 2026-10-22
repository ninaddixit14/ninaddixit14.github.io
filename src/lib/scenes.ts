/* Procedural key art (stands in for screenshots). Ported from the original HTML design. */
export type Shot =
  | { p: "dusk"; seed: number; sun: number }
  | { p: "ember"; seed: number; fx: number }
  | { p: "gray"; seed: number; z: number };

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

function ridge(c: C, w: number, h: number, base: number, amp: number, col: string, r: () => number, shift: number) {
  const p1 = r() * TAU, p2 = r() * TAU, p3 = r() * TAU, f1 = 1 + r() * 2, f2 = 3 + r() * 4, f3 = 9 + r() * 8;
  c.beginPath(); c.moveTo(0, h);
  for (let x = 0; x <= w + 8; x += 6) {
    const u = (x + shift) / w;
    const n = 0.55 * Math.sin(u * f1 * TAU + p1) + 0.3 * Math.sin(u * f2 * TAU + p2) + 0.15 * Math.sin(u * f3 * TAU + p3);
    c.lineTo(x, h * base - (h * amp * (n + 1)) / 2);
  }
  c.lineTo(w, h); c.closePath(); c.fillStyle = col; c.fill();
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

export function paintScene(cv: HTMLCanvasElement, shot: Shot, t = 0, px = 0) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5), w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext("2d");
  if (!c) return;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (shot.p === "dusk") dusk(c, w, h, shot, t, px);
  else if (shot.p === "ember") ember(c, w, h, shot, t, px);
  else gray(c, w, h, shot, t, px);
}
