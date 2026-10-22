/* Interactive watercolour scene ported from the user-supplied layout. */
function rng(s) { s = s % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
var TAU = Math.PI * 2;

function ridge(c, w, h, base, amp, col, r, shift) {
  var p1 = r() * TAU, p2 = r() * TAU, p3 = r() * TAU, f1 = 1 + r() * 2, f2 = 3 + r() * 4, f3 = 9 + r() * 8;
  c.beginPath(); c.moveTo(0, h);
  for (var x = 0; x <= w + 8; x += 6) {
    var u = (x + shift) / w;
    var n = .55 * Math.sin(u * f1 * TAU + p1) + .3 * Math.sin(u * f2 * TAU + p2) + .15 * Math.sin(u * f3 * TAU + p3);
    c.lineTo(x, h * base - h * amp * (n + 1) / 2);
  }
  c.lineTo(w, h); c.closePath(); c.fillStyle = col; c.fill();
}

export function mountHeroPlatformer(cv, hero, onCount) {

  const c = cv.getContext("2d");
  if (!c) return () => {};
  const cleanups = [];
  const listen = (target, name, handler, options) => { target.addEventListener(name, handler, options); cleanups.push(() => target.removeEventListener(name, handler, options)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var bg = document.createElement("canvas"), bc = bg.getContext("2d");
  if (!bc) return () => {};
  var W, H, S, dpr, ground, plats = [], orbs = [], blooms = [], petals = [], found = 0, resetAt = 0;
  var P = { x: 0, y: 0, vx: 0, vy: 0, on: false, face: 1, run: 0, squash: 1, scarf: [] };
  var keys = { l: false, r: false }, jumpPressed = false, tap = null, lastInput = -1e9, visible = true, stuck = 0, lastX = 0;
  var LAYOUT = [[.05, .82, .13], [.22, .755, .1], [.38, .685, .11], [.54, .61, .1], [.68, .535, .1], [.82, .455, .12]];
  var HUES = ["#ffe2a8", "#ffc2d4", "#c9b8ff", "#a8e6ff", "#ffd1a8", "#b8ffd9"];

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight; S = Math.max(.7, Math.min(1.3, H / 800));
    [cv, bg].forEach(function (k) { k.width = Math.round(W * dpr); k.height = Math.round(H * dpr); });
    c.setTransform(dpr, 0, 0, dpr, 0, 0); bc.setTransform(dpr, 0, 0, dpr, 0, 0);
    ground = H * .905;
    var narrow = W < 700;
    plats = LAYOUT.map(function (L) {
      var fy = narrow ? .64 + (L[1] - .455) * .6 : L[1];
      var w = Math.max(L[2] * W, 84 * S), x = Math.min(L[0] * W, W - w - 10);
      return { x: x, y: fy * H, w: w };
    });
    paintBg(); placeOrbs();
    P.x = plats[0].x + 10; P.y = ground; P.vx = P.vy = 0; P.scarf = [];
    for (var i = 0; i < 9; i++) P.scarf.push({ x: P.x, y: P.y - 20 * S });
    petals = []; for (i = 0; i < 34; i++) petals.push(petal(Math.random() * W, Math.random() * H, 0));
  }
  function petal(x, y, burst) {
    var a = Math.random() * TAU;
    return { x: x, y: y, vx: burst ? Math.cos(a) * burst : 0, vy: burst ? Math.sin(a) * burst - 1 : .4 + Math.random() * .6,
      ph: Math.random() * TAU, rot: Math.random() * TAU, sz: (2.5 + Math.random() * 3) * S, col: ["#ffd6e0", "#fff0f3", "#ffc2d1", "#ffe9c9"][Math.floor(Math.random() * 4)], life: burst ? 1 : -1 };
  }
  function placeOrbs() {
    orbs = plats.map(function (p, i) { return { x: p.x + p.w / 2, y: p.y - 40 * S, ph: i, got: false, col: HUES[i] }; });
    found = 0; blooms = []; resetAt = 0; updateCount();
  }
  function updateCount() { onCount(found, orbs.length); }

  function paintBg() {
    var r = rng(12), i, j;
    var g = bc.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#231d48"); g.addColorStop(.33, "#56397a"); g.addColorStop(.6, "#bd6a8e"); g.addColorStop(.8, "#f0a99a"); g.addColorStop(1, "#f6c9a8");
    bc.fillStyle = g; bc.fillRect(0, 0, W, H);
    var wash = ["255,190,200", "190,150,230", "255,210,180", "120,90,170"];
    for (i = 0; i < 34; i++) {
      var x = r() * W, y = r() * H * .85, rad = (.08 + r() * .25) * Math.max(W, H), col = wash[Math.floor(r() * 4)];
      var rg = bc.createRadialGradient(x, y, 0, x, y, rad); rg.addColorStop(0, "rgba(" + col + "," + (.06 + r() * .1) + ")"); rg.addColorStop(1, "rgba(" + col + ",0)");
      bc.fillStyle = rg; bc.fillRect(0, 0, W, H);
    }
    var narrow = W < 700, sx = W * (narrow ? .74 : .76), sy = H * (narrow ? .2 : .27), sr = Math.min(H * .13, W * .2);
    var glow = bc.createRadialGradient(sx, sy, 0, sx, sy, sr * 3.2); glow.addColorStop(0, "rgba(255,226,206,.5)"); glow.addColorStop(1, "rgba(255,226,206,0)");
    bc.fillStyle = glow; bc.fillRect(0, 0, W, H);
    for (i = 0; i < 6; i++) { bc.fillStyle = "rgba(253,234,218,.22)"; bc.beginPath(); bc.arc(sx + (r() - .5) * 8, sy + (r() - .5) * 8, sr * (.96 + r() * .08), 0, TAU); bc.fill(); }
    var layers = [[.7, .24, "150,96,150", .3, 6], [.78, .19, "108,66,128", .4, 3], [.86, .14, "64,40,96", .55, 1.5]];
    for (i = 0; i < layers.length; i++) for (j = 0; j < 3; j++) {
      var L = layers[i];
      bc.filter = "blur(" + (L[4] + j) + "px)";
      ridge(bc, W, H, L[0] + j * .007, L[1], "rgba(" + L[2] + "," + L[3] + ")", rng(100 + i), j * 24);
      bc.filter = "none";
    }
    var mist = bc.createLinearGradient(0, H * .7, 0, H * .92); mist.addColorStop(0, "rgba(246,201,168,0)"); mist.addColorStop(.6, "rgba(246,201,168,.22)"); mist.addColorStop(1, "rgba(246,201,168,0)");
    bc.fillStyle = mist; bc.fillRect(0, H * .7, W, H * .25);
    ridge(bc, W, H, .925, .02, "#1a1430", rng(7), 0);
    bc.fillStyle = "#1a1430"; bc.fillRect(0, H * .92, W, H * .1);
    plats.forEach(function (p, k) {
      var pr = rng(40 + k);
      for (var pass = 0; pass < 2; pass++) {
        bc.beginPath(); bc.moveTo(p.x, p.y);
        bc.lineTo(p.x + p.w, p.y);
        var steps = 6, tipX = p.x + p.w * (.4 + pr() * .2), tipY = p.y + p.w * (.45 + pr() * .2);
        for (var q = 1; q <= steps; q++) { var t = q / steps; bc.lineTo(p.x + p.w - (p.x + p.w - tipX) * t + (pr() - .5) * 6, p.y + (tipY - p.y) * t * (t < 1 ? .9 : 1)); }
        for (q = 1; q < steps; q++) { var u = q / steps; bc.lineTo(tipX - (tipX - p.x) * u + (pr() - .5) * 6, tipY - (tipY - p.y) * u); }
        bc.closePath(); bc.fillStyle = pass ? "rgba(60,40,96,.45)" : "#1d1634"; bc.fill();
      }
      bc.fillStyle = "#2a1f48"; rr2(bc, p.x - 2, p.y - 4, p.w + 4, 9, 4); bc.fill();
      bc.strokeStyle = "rgba(255,196,196,.6)"; bc.lineWidth = 2; bc.beginPath(); bc.moveTo(p.x + 3, p.y - 3.5); bc.lineTo(p.x + p.w - 3, p.y - 3.5); bc.stroke();
    });
    for (i = 0; i < 5000; i++) { bc.fillStyle = r() > .5 ? "rgba(255,255,255,.035)" : "rgba(0,0,0,.035)"; bc.fillRect(r() * W, r() * H, 1, 1); }
  }
  function rr2(k, x, y, w, h, rad) { k.beginPath(); k.moveTo(x + rad, y); k.arcTo(x + w, y, x + w, y + h, rad); k.arcTo(x + w, y + h, x, y + h, rad); k.arcTo(x, y + h, x, y, rad); k.arcTo(x, y, x + w, y, rad); k.closePath(); }

  function jump() { if (P.on) { P.vy = -11 * S; P.on = false; P.squash = 1.25; } }
  function autopilot(now) {
    var target = null, i;
    for (i = 0; i < orbs.length; i++) if (!orbs[i].got) { target = i; break; }
    if (target === null) return Math.sin(now * .0004) > 0 ? 1 : -1;
    var idx = target;
    while (idx > 0 && plats[idx].y < P.y - 100 * S) idx--;
    var p = plats[idx], tx = p.x + p.w / 2, dx = tx - P.x;
    if (p.y < P.y - 10 * S) {
      if (P.on && Math.abs(dx) < p.w / 2 + 90 * S) jump();
    }
    if (P.on && stuck > 700) { jump(); stuck = 0; }
    return Math.abs(dx) > 8 * S ? Math.sign(dx) : 0;
  }

  function step(dt, now) {
    var k = Math.min(dt, 40) / 16.7, dir = (keys.r ? 1 : 0) - (keys.l ? 1 : 0), i;
    if (jumpPressed) { jump(); jumpPressed = false; }
    if (tap) {
      var tdx = tap.x - P.x; dir = Math.abs(tdx) > 14 * S ? Math.sign(tdx) : 0;
      if (tap.jump) { if (tap.y < P.y - 24 * S) jump(); tap.jump = false; }
    }
    if (!reduce && now - lastInput > 6000) dir = autopilot(now);
    if (dir) { P.vx += dir * .5 * S * k; P.face = dir; } else P.vx *= Math.pow(.75, k);
    P.vx = Math.max(-3.4 * S, Math.min(3.4 * S, P.vx));
    var prevY = P.y; P.vy += .55 * S * k; P.x += P.vx * k; P.y += P.vy * k;
    P.x = Math.max(8, Math.min(W - 8, P.x));
    var wasOn = P.on; P.on = false;
    if (P.vy >= 0) {
      for (i = 0; i < plats.length; i++) { var p = plats[i]; if (prevY <= p.y + 1 && P.y >= p.y && P.x > p.x - 4 && P.x < p.x + p.w + 4) { P.y = p.y; P.vy = 0; P.on = true; } }
      if (P.y >= ground) { P.y = ground; P.vy = 0; P.on = true; }
    }
    if (P.on && !wasOn) P.squash = .72;
    P.squash += (1 - P.squash) * .2 * k;
    P.run += Math.abs(P.vx) * .09 * k;
    stuck = (dir && Math.abs(P.x - lastX) < .2) ? stuck + dt : 0; lastX = P.x;
    // scarf
    var seg = 5 * S, ax = P.x - P.face * 2 * S, ay = P.y - 29 * S;
    P.scarf[0].x = ax; P.scarf[0].y = ay;
    for (i = 1; i < P.scarf.length; i++) {
      var pt = P.scarf[i], prev = P.scarf[i - 1];
      pt.x += (prev.x - P.face * seg - pt.x) * .35 * k; pt.y += (prev.y + seg * .2 + Math.sin(now * .006 + i * .8) * 1.4 * S - pt.y) * .35 * k;
      var ddx = pt.x - prev.x, ddy = pt.y - prev.y, dd = Math.hypot(ddx, ddy), mx = seg * 1.25;
      if (dd > mx) { pt.x = prev.x + ddx / dd * mx; pt.y = prev.y + ddy / dd * mx; }
    }
    // orbs
    for (i = 0; i < orbs.length; i++) {
      var o = orbs[i]; if (o.got) continue;
      var oy = o.y + Math.sin(now * .002 + o.ph) * 4 * S;
      if (Math.hypot(P.x - o.x, P.y - 14 * S - oy) < 24 * S) {
        o.got = true; found++; updateCount();
        blooms.push({ x: o.x, y: oy, t0: now, col: o.col });
        for (var b = 0; b < 12; b++) petals.push(petal(o.x, oy, 2 + Math.random() * 2));
        if (found === orbs.length) resetAt = now + 5000;
      }
    }
    if (resetAt && now > resetAt) placeOrbs();
    // petals
    for (i = petals.length - 1; i >= 0; i--) {
      var q = petals[i];
      if (q.life > 0) { q.vx *= .97; q.vy = q.vy * .97 + .03; q.life -= .006 * k; if (q.life <= 0) { petals.splice(i, 1); continue; } }
      q.x += (q.vx + Math.sin(now * .001 + q.ph) * .5 - .35) * k * (reduce ? 0 : 1);
      q.y += (q.life > 0 ? q.vy : q.vy * S) * k * (reduce ? 0 : 1); q.rot += .02 * k;
      if (q.life < 0) { if (q.y > H + 10) { q.y = -10; q.x = Math.random() * W * 1.2; } if (q.x < -10) q.x = W + 10; }
    }
  }

  function draw(now) {
    c.drawImage(bg, 0, 0, W, H);
    blooms.forEach(function (b) {
      var a = Math.min(1, (now - b.t0) / 1400), e = 1 - Math.pow(1 - a, 3), rad = e * 280 * S;
      var g = c.createRadialGradient(b.x, b.y, 0, b.x, b.y, Math.max(1, rad));
      g.addColorStop(0, hexA(b.col, .35 - a * .17)); g.addColorStop(1, hexA(b.col, 0));
      c.fillStyle = g; c.fillRect(b.x - rad, b.y - rad, rad * 2, rad * 2);
      if (a < 1) { c.strokeStyle = hexA(b.col, .6 * (1 - a)); c.lineWidth = 2; c.beginPath(); c.arc(b.x, b.y, e * 120 * S, 0, TAU); c.stroke(); }
    });
    orbs.forEach(function (o) {
      if (o.got) return;
      var oy = o.y + Math.sin(now * .002 + o.ph) * 4 * S, gl = c.createRadialGradient(o.x, oy, 0, o.x, oy, 24 * S);
      gl.addColorStop(0, hexA(o.col, .9)); gl.addColorStop(.35, hexA(o.col, .35)); gl.addColorStop(1, hexA(o.col, 0));
      c.fillStyle = gl; c.beginPath(); c.arc(o.x, oy, 24 * S, 0, TAU); c.fill();
      c.fillStyle = "#fffaf0"; c.beginPath(); c.arc(o.x, oy, 4.5 * S, 0, TAU); c.fill();
    });
    drawPlayer();
    petals.forEach(function (q) {
      c.save(); c.translate(q.x, q.y); c.rotate(q.rot); c.globalAlpha = q.life > 0 ? q.life : .8;
      c.fillStyle = q.col; c.beginPath(); c.ellipse(0, 0, q.sz, q.sz * .55, 0, 0, TAU); c.fill(); c.restore();
    });
  }
  function hexA(h, a) { var n = parseInt(h.slice(1), 16); return "rgba(" + (n >> 16) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + Math.max(0, a) + ")"; }
  function drawPlayer() {
    var x = P.x, y = P.y, ch = 34 * S, cw = 15 * S, ink = "#1a1430";
    var gl = c.createRadialGradient(x, y - ch * .5, 0, x, y - ch * .5, ch * 1.6); gl.addColorStop(0, "rgba(255,225,205,.28)"); gl.addColorStop(1, "rgba(255,225,205,0)");
    c.fillStyle = gl; c.fillRect(x - ch * 2, y - ch * 2.2, ch * 4, ch * 4);
    c.lineCap = "round";
    for (var i = 1; i < P.scarf.length; i++) {
      c.strokeStyle = "#ff6f61"; c.lineWidth = Math.max(1, (4.2 - i * .38) * S);
      c.beginPath(); c.moveTo(P.scarf[i - 1].x, P.scarf[i - 1].y); c.lineTo(P.scarf[i].x, P.scarf[i].y); c.stroke();
    }
    c.save(); c.translate(x, y); c.scale(P.face * (1 + (1 - P.squash) * .5), P.squash);
    var sw = P.on && Math.abs(P.vx) > .3 ? Math.sin(P.run) * 4 * S : 0;
    c.strokeStyle = ink; c.lineWidth = 2.4 * S;
    c.beginPath(); c.moveTo(-2.5 * S, -8 * S); c.lineTo(-2.5 * S + sw, 0); c.moveTo(2.5 * S, -8 * S); c.lineTo(2.5 * S - sw, 0); c.stroke();
    c.fillStyle = ink; c.beginPath(); c.moveTo(0, -ch * .9); c.quadraticCurveTo(cw * .9, -ch * .4, cw * .8, -6 * S); c.lineTo(-cw * .8, -6 * S); c.quadraticCurveTo(-cw * .9, -ch * .4, 0, -ch * .9); c.fill();
    c.beginPath(); c.arc(0, -ch * .92, cw * .5, 0, TAU); c.fill();
    c.fillStyle = "#f6e7dc"; c.beginPath(); c.ellipse(cw * .2, -ch * .92, cw * .2, cw * .26, 0, 0, TAU); c.fill();
    c.restore();
  }

  function active() { var r = hero.getBoundingClientRect(); return visible && r.bottom > window.innerHeight * .5; }
  var KEYMAP = { ArrowLeft: "l", a: "l", A: "l", ArrowRight: "r", d: "r", D: "r" };
  listen(window, "keydown", function (e) {
    if (!active() || (e.target instanceof Element && e.target.closest("input, textarea, select, a, button"))) return;
    var up = e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W";
    if (KEYMAP[e.key]) keys[KEYMAP[e.key]] = true; else if (!up) return;
    if (up && !e.repeat) jumpPressed = true;
    lastInput = performance.now(); e.preventDefault();
  });
  listen(window, "keyup", function (e) { if (KEYMAP[e.key]) keys[KEYMAP[e.key]] = false; });
  function local(e) { var r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  listen(hero, "pointerdown", function (e) { if (e.target.closest("a, button")) return; var p = local(e); tap = { x: p.x, y: p.y, jump: true }; lastInput = performance.now(); });
  listen(hero, "pointermove", function (e) { if (tap) { var p = local(e); tap.x = p.x; tap.y = p.y; lastInput = performance.now(); } });
  ["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { listen(hero, n, function () { tap = null; }); });
  const observer = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (!visible) { keys.l = keys.r = false; tap = null; } });
  observer.observe(hero);
  cleanups.push(() => observer.disconnect());
  listen(window, "blur", () => { keys.l = keys.r = false; tap = null; });
  var rzt, lastW = 0;
  listen(window, "resize", function () { clearTimeout(rzt); rzt = setTimeout(function () { if (Math.abs(hero.clientWidth - lastW) > 2 || Math.abs(hero.clientHeight - H) > 120) { layout(); lastW = W; } }, 150); });

  layout(); lastW = W;
  let raf = 0;
  var last = performance.now();
  (function loop(now) {
    var dt = now - last; last = now;
    if (visible) { step(dt, now); draw(now); }
    raf = requestAnimationFrame(loop);
  })(last);

  return () => { cancelAnimationFrame(raf); clearTimeout(rzt); cleanups.forEach(cleanup => cleanup()); };
}
