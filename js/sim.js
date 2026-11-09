// Frontier-based exploration of an unknown map.
//
// The vehicle only knows what its lidar has seen. Rays mark an occupancy grid,
// hits are inflated by the vehicle radius, A* plans over that grid (unknown
// cells count as free), and the route is replanned when a new hit blocks it.
// With no goal from the user, it drives to the frontier with the best
// information gain. World units are CSS pixels; PX_PER_M is only for the readout.
window.createSim = (canvas, onState) => {
  "use strict";

  const CELL = 12;
  const INFLATE = 22;
  const LIDAR_RANGE = 185;
  const LIDAR_SPIN = 17; // rad/s
  const RAY_STEP = 0.02; // rad
  const V_MAX = 68;
  const OMEGA_MAX = 3;
  const ACCEL = 140;
  const LOOKAHEAD = 30;
  const PX_PER_M = 30;
  const HOLD_COMPLETE = 2.6; // seconds the finished map stays up
  const FADE = 0.8;
  const UNKNOWN = 0, FREE = 1, HIT = 2;

  const ctx = canvas.getContext("2d");
  const freeLayer = document.createElement("canvas");
  const hitLayer = document.createElement("canvas");
  const freeCtx = freeLayer.getContext("2d");
  const hitCtx = hitLayer.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, minCol = 0;
  let obstacles, known, blocked, knownInside, freeTotal;
  let robot, path, pathIndex, goal, userGoal, planMs, flash, recent, trail;
  let sweep, sinceReplan, sinceGoalCheck, sinceHud, phase, phaseTime;
  let colors, freePattern;
  let running = false, raf = 0, last = 0, builtWidth = 0;

  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  const idx = (x, y) => y * cols + x;
  const inGrid = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows;
  const cellOf = (v) => Math.floor(v / CELL);
  const isBlockedAt = (px, py) => {
    const x = cellOf(px), y = cellOf(py);
    return !inGrid(x, y) || blocked[idx(x, y)] === 1;
  };

  // ---------- world ----------
  function makeObstacle(cx, cy, r) {
    const pts = [];
    if (Math.random() < 0.55) {
      const a = rand(0, Math.PI), hw = r * rand(0.6, 0.85), hh = Math.sqrt(r * r - hw * hw);
      for (const [sx, sy] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
        const x = sx * hw, y = sy * hh;
        pts.push([cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]);
      }
    } else {
      const n = 5 + Math.floor(Math.random() * 3), start = rand(0, 6.28);
      for (let i = 0; i < n; i++) {
        const a = start + (i / n) * Math.PI * 2 + rand(-0.2, 0.2), d = r * rand(0.72, 1);
        pts.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]);
      }
    }
    return { cx, cy, r, pts };
  }

  function inside(o, x, y) {
    let c = false;
    for (let i = 0, j = o.pts.length - 1; i < o.pts.length; j = i++) {
      const [xi, yi] = o.pts[i], [xj, yj] = o.pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  function buildWorld() {
    const startX = W * (minCol ? 0.58 : 0.5), startY = H * 0.5;
    obstacles = [];
    const gap = INFLATE * 2 + 8;
    const target = (W * H) / 8200;
    for (let tries = 0; tries < 900 && obstacles.length < target; tries++) {
      const r = rand(14, 46), x = rand(0, W), y = rand(0, H);
      if (Math.hypot(x - startX, y - startY) < r + 60) continue;
      if (obstacles.some((o) => Math.hypot(o.cx - x, o.cy - y) < o.r + r + gap)) continue;
      obstacles.push(makeObstacle(x, y, r));
    }

    cols = Math.ceil(W / CELL);
    rows = Math.ceil(H / CELL);
    minCol = matchMedia("(min-width: 901px)").matches ? Math.ceil(cols * 0.12) : 0;
    known = new Uint8Array(cols * rows);
    blocked = new Uint8Array(cols * rows);
    knownInside = 0;
    freeTotal = 0;
    for (let y = 0; y < rows; y++) for (let x = minCol; x < cols; x++) {
      const px = (x + 0.5) * CELL, py = (y + 0.5) * CELL;
      if (!obstacles.some((o) => Math.hypot(o.cx - px, o.cy - py) <= o.r && inside(o, px, py))) freeTotal++;
    }

    freeCtx.clearRect(0, 0, W, H);
    hitCtx.clearRect(0, 0, W, H);
    robot = { x: startX, y: startY, th: rand(-3, 3), v: 0 };
    path = []; pathIndex = 0; goal = null; userGoal = false;
    planMs = 0; flash = null; recent = []; trail = [];
    sweep = 0; sinceReplan = 0; sinceGoalCheck = 0; sinceHud = 1;
    phase = "exploring"; phaseTime = 0;
  }

  function setup() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    builtWidth = W;
    canvas.width = freeLayer.width = hitLayer.width = Math.round(W * dpr);
    canvas.height = freeLayer.height = hitLayer.height = Math.round(H * dpr);
    for (const c of [ctx, freeCtx, hitCtx]) c.setTransform(dpr, 0, 0, dpr, 0, 0);
    minCol = matchMedia("(min-width: 901px)").matches ? 1 : 0; // refined in buildWorld
    readColors();
    buildWorld();
  }

  // ---------- colours ----------
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    colors = { free: v("--sim-free"), grid: v("--sim-grid"), hit: v("--sim-hit"), accent: v("--sim-accent"), text: v("--text"), bg: v("--bg") };
    const tile = document.createElement("canvas");
    tile.width = tile.height = 48 * dpr;
    const t = tile.getContext("2d");
    t.fillStyle = colors.free; t.fillRect(0, 0, tile.width, tile.height);
    t.fillStyle = colors.grid;
    t.fillRect(0, 0, tile.width, Math.max(1, dpr));
    t.fillRect(0, 0, Math.max(1, dpr), tile.height);
    freePattern = freeCtx.createPattern(tile, "repeat");
    freePattern.setTransform(new DOMMatrix().scale(1 / dpr));
  }

  function recolor(c, style) {
    c.save();
    c.globalCompositeOperation = "source-in";
    c.fillStyle = style;
    c.fillRect(0, 0, W, H);
    c.restore();
  }

  function refreshColors() {
    readColors();
    recolor(freeCtx, freePattern);
    recolor(hitCtx, colors.hit);
    if (!running) draw();
  }

  // ---------- lidar ----------
  function castRay(ox, oy, a) {
    const dx = Math.cos(a), dy = Math.sin(a);
    let best = LIDAR_RANGE;
    for (const o of obstacles) {
      const cx = o.cx - ox, cy = o.cy - oy;
      if (Math.hypot(cx, cy) > LIDAR_RANGE + o.r) continue;
      for (let i = 0, j = o.pts.length - 1; i < o.pts.length; j = i++) {
        const ax = o.pts[j][0] - ox, ay = o.pts[j][1] - oy;
        const ex = o.pts[i][0] - o.pts[j][0], ey = o.pts[i][1] - o.pts[j][1];
        const den = dx * ey - dy * ex;
        if (Math.abs(den) < 1e-9) continue;
        const t = (ax * ey - ay * ex) / den;
        const u = (ax * dy - ay * dx) / den;
        if (t > 0 && t < best && u >= 0 && u <= 1) best = t;
      }
    }
    return best;
  }

  function markFree(x, y) {
    if (!inGrid(x, y)) return;
    const c = idx(x, y);
    if (known[c] !== UNKNOWN) return;
    known[c] = FREE;
    if (x >= minCol) knownInside++;
  }

  function markHit(px, py) {
    const x = cellOf(px), y = cellOf(py);
    if (!inGrid(x, y)) return false;
    const c = idx(x, y);
    if (known[c] === HIT) return false;
    if (known[c] === UNKNOWN && x >= minCol) knownInside++;
    known[c] = HIT;
    const n = Math.ceil(INFLATE / CELL);
    for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
      if (!inGrid(x + i, y + j)) continue;
      if (Math.hypot(i, j) * CELL <= INFLATE + CELL * 0.5) blocked[idx(x + i, y + j)] = 1;
    }
    return true;
  }

  function scan(from, to) {
    const ox = robot.x, oy = robot.y;
    let changed = false;
    freeCtx.fillStyle = freePattern;
    freeCtx.beginPath();
    freeCtx.moveTo(ox, oy);
    hitCtx.fillStyle = colors.hit;
    const rays = Math.max(1, Math.round((to - from) / RAY_STEP));
    for (let r = 0; r <= rays; r++) {
      const a = from + ((to - from) * r) / rays;
      const d = castRay(ox, oy, a);
      const cs = Math.cos(a), sn = Math.sin(a);
      for (let s = 0; s < d - CELL * 0.5; s += CELL * 0.6) markFree(cellOf(ox + cs * s), cellOf(oy + sn * s));
      freeCtx.lineTo(ox + cs * d, oy + sn * d);
      if (d < LIDAR_RANGE) {
        const hx = ox + cs * d, hy = oy + sn * d;
        hitCtx.fillRect(hx - 0.8, hy - 0.8, 1.6, 1.6);
        recent.push({ x: hx, y: hy, t: 0 });
        if (markHit(hx, hy)) changed = true;
      }
    }
    freeCtx.closePath();
    freeCtx.fill();
    return changed;
  }

  // ---------- planning ----------
  function nearestFree(px, py, radius = 8) {
    const cx = cellOf(px), cy = cellOf(py);
    let best = null, bestD = Infinity;
    for (let j = -radius; j <= radius; j++) for (let i = -radius; i <= radius; i++) {
      const x = cx + i, y = cy + j;
      if (!inGrid(x, y) || blocked[idx(x, y)]) continue;
      const d = i * i + j * j;
      if (d < bestD) { bestD = d; best = { x, y }; }
    }
    return best;
  }

  function astar(sx, sy, gx, gy) {
    const n = cols * rows;
    const g = new Float32Array(n).fill(Infinity);
    const from = new Int32Array(n).fill(-1);
    const closed = new Uint8Array(n);
    const heap = []; // binary heap of [f, cell]
    const push = (f, c) => {
      let i = heap.length; heap.push([f, c]);
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
      }
    };
    const pop = () => {
      const top = heap[0], end = heap.pop();
      if (heap.length) {
        heap[0] = end;
        for (let i = 0; ;) {
          let m = i; const l = 2 * i + 1, r = l + 1;
          if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
          if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
          if (m === i) break;
          [heap[m], heap[i]] = [heap[i], heap[m]]; i = m;
        }
      }
      return top[1];
    };
    const h = (x, y) => {
      const dx = Math.abs(x - gx), dy = Math.abs(y - gy);
      return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
    };
    const open = (x, y) => inGrid(x, y) && !blocked[idx(x, y)];

    const expanded = [];
    g[idx(sx, sy)] = 0;
    push(h(sx, sy), idx(sx, sy));
    while (heap.length) {
      const cur = pop();
      if (closed[cur]) continue;
      closed[cur] = 1;
      expanded.push(cur);
      const cx = cur % cols, cy = (cur / cols) | 0;
      if (cx === gx && cy === gy) {
        const out = [];
        for (let c = cur; c !== -1; c = from[c]) out.push(c);
        return { cells: out.reverse(), expanded };
      }
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if ((!dx && !dy) || !open(cx + dx, cy + dy)) continue;
        if (dx && dy && (!open(cx + dx, cy) || !open(cx, cy + dy))) continue;
        const nc = idx(cx + dx, cy + dy);
        const ng = g[cur] + (dx && dy ? Math.SQRT2 : 1);
        if (ng < g[nc]) { g[nc] = ng; from[nc] = cur; push(ng + h(cx + dx, cy + dy), nc); }
      }
    }
    return { cells: null, expanded };
  }

  function lineClear(a, b) {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const steps = Math.ceil(d / (CELL / 3));
    for (let i = 0; i <= steps; i++) {
      if (isBlockedAt(a[0] + ((b[0] - a[0]) * i) / steps, a[1] + ((b[1] - a[1]) * i) / steps)) return false;
    }
    return true;
  }

  // String-pull the grid path, round its corners, then resample evenly.
  function smooth(cells) {
    const pts = cells.map((c) => [((c % cols) + 0.5) * CELL, (((c / cols) | 0) + 0.5) * CELL]);
    let pulled = [pts[0]];
    for (let i = 0; i < pts.length - 1;) {
      let j = pts.length - 1;
      while (j > i + 1 && !lineClear(pts[i], pts[j])) j--;
      pulled.push(pts[j]);
      i = j;
    }
    for (let k = 0; k < 2; k++) {
      const out = [pulled[0]];
      for (let i = 0; i < pulled.length - 1; i++) {
        const [ax, ay] = pulled[i], [bx, by] = pulled[i + 1];
        out.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25], [ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75]);
      }
      out.push(pulled[pulled.length - 1]);
      pulled = out;
    }
    const out = [];
    for (let i = 0; i < pulled.length - 1; i++) {
      const [ax, ay] = pulled[i], [bx, by] = pulled[i + 1];
      const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 6));
      for (let s = 0; s < n; s++) out.push([ax + ((bx - ax) * s) / n, ay + ((by - ay) * s) / n]);
    }
    out.push(pulled[pulled.length - 1]);
    return out;
  }

  function plan(target) {
    const start = isBlockedAt(robot.x, robot.y) ? nearestFree(robot.x, robot.y) : { x: cellOf(robot.x), y: cellOf(robot.y) };
    if (!start || !inGrid(start.x, start.y)) return false;
    const t0 = performance.now();
    const { cells, expanded } = astar(start.x, start.y, target.x, target.y);
    if (!cells || cells.length < 2) return false;
    path = smooth(cells);
    planMs = performance.now() - t0;
    pathIndex = 0;
    goal = target;
    flash = { cells: expanded, t: 0 };
    sinceReplan = 0;
    return true;
  }

  function isFrontier(x, y) {
    if (known[idx(x, y)] !== FREE) return false;
    for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + i, ny = y + j;
      if (inGrid(nx, ny) && nx >= minCol && known[idx(nx, ny)] === UNKNOWN) return true;
    }
    return false;
  }

  function gain(x, y) {
    let g = 0;
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) {
      if (inGrid(x + i, y + j) && x + i >= minCol && known[idx(x + i, y + j)] === UNKNOWN) g++;
    }
    return g;
  }

  function nextFrontier() {
    const margin = 2;
    const found = [];
    for (let y = margin; y < rows - margin; y++) for (let x = Math.max(minCol, margin); x < cols - margin; x++) {
      if (!blocked[idx(x, y)] && isFrontier(x, y)) found.push({ x, y });
    }
    if (!found.length) return false;
    const rx = robot.x / CELL, ry = robot.y / CELL;
    const scored = [];
    for (let i = 0; i < 90; i++) {
      const c = found[Math.floor(Math.random() * found.length)];
      const d = Math.hypot(c.x - rx, c.y - ry);
      if (d < 3) continue;
      scored.push({ c, s: gain(c.x, c.y) / (d + 8) });
    }
    scored.sort((a, b) => b.s - a.s);
    for (const { c } of scored.slice(0, 6)) if (plan(c)) return true;
    return false;
  }

  function setUserGoal(px, py) {
    const t = nearestFree(clamp(px, 1, W - 1), clamp(py, 1, H - 1));
    if (!t) return false;
    if (phase === "complete") { phase = "exploring"; phaseTime = 0; }
    if (!plan(t)) return false;
    userGoal = true;
    return true;
  }

  // ---------- step ----------
  function follow(dt) {
    if (pathIndex >= path.length - 1) { robot.v = 0; return true; }
    let best = pathIndex, bestD = Infinity;
    for (let i = pathIndex; i < Math.min(path.length, pathIndex + 25); i++) {
      const d = Math.hypot(path[i][0] - robot.x, path[i][1] - robot.y);
      if (d < bestD) { bestD = d; best = i; }
    }
    pathIndex = best;
    let li = pathIndex;
    while (li < path.length - 1 && Math.hypot(path[li][0] - robot.x, path[li][1] - robot.y) < LOOKAHEAD) li++;
    const [tx, ty] = path[li];
    const end = path[path.length - 1];
    const toEnd = Math.hypot(end[0] - robot.x, end[1] - robot.y);
    if (toEnd < 5) { robot.v = 0; return true; }

    const alpha = wrap(Math.atan2(ty - robot.y, tx - robot.x) - robot.th);
    const align = Math.abs(alpha) > 1.1 ? 0 : Math.cos(alpha) ** 3;
    const vTarget = Math.min(V_MAX * align, toEnd * 2.2 + 8 * align);
    robot.v += clamp(vTarget - robot.v, -ACCEL * dt, ACCEL * dt);
    robot.th = wrap(robot.th + clamp(alpha * 4, -OMEGA_MAX, OMEGA_MAX) * dt);
    robot.x += Math.cos(robot.th) * robot.v * dt;
    robot.y += Math.sin(robot.th) * robot.v * dt;

    const lt = trail[trail.length - 1];
    if (!lt || Math.hypot(lt[0] - robot.x, lt[1] - robot.y) > 6) trail.push([robot.x, robot.y]);
    return false;
  }

  function routeBlocked() {
    for (let i = pathIndex; i < path.length; i += 2) if (isBlockedAt(path[i][0], path[i][1])) return true;
    return false;
  }

  function explored() {
    return freeTotal ? Math.min(100, Math.round((knownInside / freeTotal) * 100)) : 0;
  }

  function finish() {
    phase = "complete"; phaseTime = 0; path = []; goal = null; userGoal = false;
  }

  function pickGoal() {
    userGoal = false;
    if (explored() >= 97 || !nextFrontier()) finish();
  }

  function replan() {
    const target = blocked[idx(goal.x, goal.y)] ? nearestFree((goal.x + 0.5) * CELL, (goal.y + 0.5) * CELL) : goal;
    if (!target || !plan(target)) pickGoal();
  }

  function step(dt) {
    if (phase === "complete") {
      phaseTime += dt;
      if (phaseTime > HOLD_COMPLETE + FADE) buildWorld();
    }

    const prev = sweep;
    sweep += LIDAR_SPIN * dt;
    const changed = scan(prev, sweep);
    sweep %= Math.PI * 2;

    if (phase !== "complete") {
      sinceReplan += dt;
      sinceGoalCheck += dt;
      if (!goal) pickGoal();
      else if (changed && sinceReplan > 0.12 && routeBlocked()) replan();
      else if (!userGoal && sinceGoalCheck > 0.35) {
        sinceGoalCheck = 0;
        if (!isFrontier(goal.x, goal.y)) pickGoal();
      }
    }
    if (goal && follow(dt)) { goal = null; path = []; }
    else if (phase === "complete") robot.v = 0;

    for (const p of recent) p.t += dt;
    if (recent.length > 900 || (recent[0] && recent[0].t > 0.45)) recent = recent.filter((p) => p.t <= 0.45).slice(-900);
    if (flash) { flash.t += dt; if (flash.t > 0.7) flash = null; }

    sinceHud += dt;
    if (sinceHud > 0.2) { sinceHud = 0; emitState(); }
  }

  function emitState() {
    onState({
      status: phase === "complete" ? "complete" : userGoal ? "navigating" : "exploring",
      explored: explored(),
      speed: Math.abs(robot.v) / PX_PER_M,
      planMs,
    });
  }

  // ---------- draw ----------
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const fade = phase === "complete" ? clamp(1 - (phaseTime - HOLD_COMPLETE) / FADE, 0, 1) : 1;
    ctx.globalAlpha = fade;
    ctx.drawImage(freeLayer, 0, 0, W, H);
    ctx.drawImage(hitLayer, 0, 0, W, H);

    if (flash) {
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.16 * (1 - flash.t / 0.7) * fade;
      for (const c of flash.cells) ctx.fillRect((c % cols) * CELL + 4, ((c / cols) | 0) * CELL + 4, CELL - 8, CELL - 8);
    }

    if (trail.length > 1) {
      ctx.strokeStyle = colors.text; ctx.globalAlpha = 0.28 * fade; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(trail[0][0], trail[0][1]);
      for (const p of trail) ctx.lineTo(p[0], p[1]);
      ctx.stroke();
    }

    ctx.fillStyle = colors.accent;
    for (const p of recent) {
      ctx.globalAlpha = (1 - p.t / 0.45) * fade;
      ctx.fillRect(p.x - 1.2, p.y - 1.2, 2.4, 2.4);
    }

    ctx.globalAlpha = fade;
    if (path.length > 1 && pathIndex < path.length) {
      ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(robot.x, robot.y);
      for (let i = pathIndex; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
      ctx.stroke();
    }
    if (goal) {
      const gx = (goal.x + 0.5) * CELL, gy = (goal.y + 0.5) * CELL;
      ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(gx, gy, 6, 0, Math.PI * 2);
      for (const [a, b, c, d] of [[-11, 0, -6, 0], [6, 0, 11, 0], [0, -11, 0, -6], [0, 6, 0, 11]]) { ctx.moveTo(gx + a, gy + b); ctx.lineTo(gx + c, gy + d); }
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.strokeStyle = colors.accent; ctx.globalAlpha = 0.5 * fade; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(sweep) * LIDAR_RANGE, Math.sin(sweep) * LIDAR_RANGE); ctx.stroke();
    ctx.globalAlpha = fade;
    ctx.rotate(robot.th);
    ctx.fillStyle = colors.text;
    ctx.fillRect(-13, -11, 26, 4); ctx.fillRect(-13, 7, 26, 4); // tracks
    ctx.beginPath(); ctx.roundRect(-11, -7, 22, 14, 2.5); ctx.fill();
    ctx.fillStyle = colors.bg;
    ctx.beginPath(); ctx.arc(0, 0, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = colors.accent;
    ctx.fillRect(7, -5, 2.5, 10);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function runOffline(steps) {
    for (let i = 0; i < steps; i++) step(1 / 30);
    emitState();
    draw();
  }

  // ---------- loop ----------
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    step(dt);
    draw();
    if (running) raf = requestAnimationFrame(loop);
  }

  function play(on) {
    if (reduced || on === running) return;
    running = on;
    if (on) { last = performance.now(); raf = requestAnimationFrame(loop); } else cancelAnimationFrame(raf);
  }

  canvas.addEventListener("click", (e) => {
    const r = canvas.getBoundingClientRect();
    if (setUserGoal(e.clientX - r.left, e.clientY - r.top) && reduced) runOffline(240);
  });

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (canvas.clientWidth === builtWidth) return;
      setup();
      if (reduced) runOffline(700);
    }, 200);
  });

  setup();
  if (reduced) runOffline(700);
  new IntersectionObserver(([en]) => play(en.isIntersecting && !document.hidden)).observe(canvas);
  document.addEventListener("visibilitychange", () => play(!document.hidden && canvas.getBoundingClientRect().bottom > 0));

  return { refreshColors };
};
