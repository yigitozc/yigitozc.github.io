(() => {
  "use strict";

  // ---------- content ----------
  // Every visible piece of content lives here. Text fields are { en, tr }.
  const data = {
    now: [
      ["🏎️", { en: "Building the autonomy stack for TEKNOFEST Robotaksi with team AUtomotion-R", tr: "AUtomotion-R takımıyla TEKNOFEST Robotaksi için otonom sürüş yazılımı geliştiriyorum" }],
      ["🧭", { en: "Simulating İKA (unmanned ground vehicle) obstacle courses in Gazebo", tr: "Gazebo'da İKA (insansız kara aracı) parkurlarını simüle ediyorum" }],
      ["🌐", { en: "Coding the MTA Workshop Inventory System for BLM2537", tr: "BLM2537 için MTA Atölye Malzeme Takip Sistemi'ni yazıyorum" }],
      ["🇯🇵", { en: "Learning Japanese, one kanji at a time", tr: "Japonca öğreniyorum, her gün bir kanji" }],
    ],
    facts: [
      ["facts.location", { en: "Ankara, Türkiye", tr: "Ankara, Türkiye" }],
      ["facts.study", { en: "Computer Engineering, Ankara University", tr: "Bilgisayar Mühendisliği, Ankara Üniversitesi" }],
      ["facts.focus", { en: "Autonomous systems · robotics · web", tr: "Otonom sistemler · robotik · web" }],
      ["facts.email", { en: "yigitozcelik88@gmail.com", tr: "yigitozcelik88@gmail.com" }],
    ],
    education: [
      {
        when: { en: "2025 → now", tr: "2025 → devam ediyor" },
        school: { en: "Ankara University", tr: "Ankara Üniversitesi" },
        degree: { en: "B.Sc. Computer Engineering", tr: "Bilgisayar Mühendisliği, lisans" },
      },
    ],
    projects: [
      {
        emoji: "🏎️", cat: ["robotics"], badge: { en: "team · private", tr: "takım · özel" },
        title: { en: "TEKNOFEST Robotaksi", tr: "TEKNOFEST Robotaksi" },
        text: {
          en: "Autonomous passenger-car stack for the TEKNOFEST Robotaxi competition with team AUtomotion-R. Dockerised ROS 2 workspace, CARLA simulation and point-cloud map calibration.",
          tr: "AUtomotion-R takımıyla TEKNOFEST Robotaksi yarışması için otonom binek araç yazılımı. Docker'lı ROS 2 çalışma alanı, CARLA simülasyonu ve nokta bulutu harita kalibrasyonu.",
        },
        tags: ["ROS 2", "CARLA", "Docker", "Python"],
      },
      {
        emoji: "🧭", cat: ["robotics"], badge: { en: "private", tr: "özel" },
        title: { en: "HTAB İKA Simulation", tr: "HTAB İKA Simülasyonu" },
        text: {
          en: "Gazebo and RViz test field for the İKA leg of TEKNOFEST Advanced Autonomous Systems: a 50×50 m rubble field with three candidate corridors generated from a seed, plus the scoring.",
          tr: "TEKNOFEST İleri Otonom Sistemler İKA ayağı için Gazebo + RViz sahası: tohumdan üretilen üç aday koridorlu 50×50 m moloz alanı ve puanlama ölçümü.",
        },
        tags: ["ROS 2", "Gazebo", "RViz", "Python"],
      },
      {
        emoji: "❄️", cat: ["hackathon", "robotics"], badge: { en: "hackathon", tr: "hackathon" },
        title: { en: "Edge AI Perception Pod", tr: "Edge AI Otonom Algı Podu" },
        text: {
          en: "HackAntarktika project: an edge AI perception module for polar field conditions.",
          tr: "HackAntarktika projesi: kutup saha koşulları için uç yapay zekâ tabanlı bir algı modülü.",
        },
        tags: ["Edge AI"],
      },
      {
        emoji: "🧰", cat: ["web"], badge: { en: "public", tr: "açık kaynak" },
        title: { en: "MTA Workshop Inventory", tr: "MTA Atölye Malzeme Takip" },
        text: {
          en: "Inventory and request system for the National Technology Workshop. Students request parts, and coordinators approve and hand them out. BLM2537 term project.",
          tr: "Milli Teknoloji Atölyesi için malzeme ve talep sistemi: öğrenciler talep oluşturur, koordinatörler onaylayıp teslim eder. BLM2537 dönem projesi.",
        },
        tags: ["HTML", "CSS", "JavaScript", "localStorage"],
        link: "https://github.com/yigitozc/mta-atolye-takip",
      },
      {
        emoji: "🏭", cat: ["web"], badge: { en: "private", tr: "özel" },
        title: { en: "MTA Management Platform", tr: "MTA Yönetim Platformu" },
        text: {
          en: "Larger version of the workshop system: a separate frontend, an API gateway and a Java/Maven backend, with Playwright end-to-end tests.",
          tr: "Atölye sisteminin büyük sürümü: ayrı frontend, API gateway ve Java/Maven backend; Playwright uçtan uca testleri.",
        },
        tags: ["Java", "Maven", "Playwright", "JavaScript"],
      },
      {
        emoji: "☕", cat: ["web"], badge: { en: "web", tr: "web" },
        title: { en: "Mola Boutique Café", tr: "Mola Butik Kafe" },
        text: {
          en: "Framework-free café site. The menu and live “how busy is it” status load from JSON, and it has an auto-playing slider and accessible dialogs.",
          tr: "Framework'süz kafe sitesi. Menü ve canlı doluluk durumu JSON'dan yükleniyor; otomatik slayt ve erişilebilir modal pencereler var.",
        },
        tags: ["HTML", "CSS", "JavaScript", "JSON"],
      },
      {
        emoji: "🧊", cat: ["robotics"], badge: { en: "3D", tr: "3D" },
        title: { en: "İKA 3D Model", tr: "İKA 3D Modeli" },
        text: {
          en: "Blender model of the unmanned ground vehicle, exported for use in the Gazebo simulations.",
          tr: "İnsansız kara aracının Blender modeli; Gazebo simülasyonlarında kullanılmak üzere hazırlandı.",
        },
        tags: ["Blender", "Gazebo"],
      },
    ],
    skills: [
      [{ en: "Languages", tr: "Programlama dilleri" }, ["Python", "C++", "Java", "JavaScript", "HTML", "CSS"]],
      [{ en: "Robotics & simulation", tr: "Robotik ve simülasyon" }, ["ROS 2", "Gazebo", "CARLA", "RViz", "YOLO", "OpenCV", "Blender"]],
      [{ en: "Tools", tr: "Araçlar" }, ["Linux", "Docker", "Git", "Maven", "Playwright", "VS Code"]],
    ],
    languages: [
      [{ en: "🇹🇷 Turkish", tr: "🇹🇷 Türkçe" }, { en: "Native", tr: "Ana dil" }, 100],
      [{ en: "🇬🇧 English", tr: "🇬🇧 İngilizce" }, { en: "Limited working proficiency", tr: "Sınırlı mesleki yeterlilik" }, 55],
      [{ en: "🇯🇵 Japanese", tr: "🇯🇵 Japonca" }, { en: "Elementary", tr: "Başlangıç" }, 22],
    ],
    certs: [
      {
        title: { en: "Programming with Python", tr: "Python ile Programlama Eğitimi" },
        meta: { en: "MATHCOM · Ankara University · Nov 2025", tr: "MATHCOM · Ankara Üniversitesi · Kasım 2025" },
      },
    ],
    clubs: [
      {
        when: { en: "2025 → now", tr: "2025 → devam ediyor" },
        name: { en: "CORE Student Community", tr: "CORE Öğrenci Topluluğu" },
        text: { en: "Ankara University student community. I help with events, organisation and sponsorship.", tr: "Ankara Üniversitesi öğrenci topluluğu. Etkinlik, organizasyon ve sponsorluk işlerinde görev alıyorum." },
      },
      {
        when: { en: "TEKNOFEST", tr: "TEKNOFEST" },
        name: { en: "AUtomotion-R", tr: "AUtomotion-R" },
        text: { en: "Autonomous vehicle team building a self-driving passenger car for the Robotaksi competition.", tr: "Robotaksi yarışması için sürücüsüz binek araç geliştiren otonom araç takımı." },
      },
      {
        when: { en: "Workshop", tr: "Atölye" },
        name: { en: "MTA · National Technology Workshop", tr: "MTA · Milli Teknoloji Atölyesi" },
        text: { en: "Hands-on hardware and making community, and the reason the inventory system exists.", tr: "Donanım ve üretim odaklı atölye topluluğu; malzeme takip sisteminin de çıkış noktası." },
      },
    ],
  };

  const filters = ["all", "robotics", "web", "hackathon"];

  // ---------- storage (may be unavailable) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // ---------- i18n + rendering ----------
  let lang = store.get("lang") === "tr" ? "tr" : "en";
  let filter = "all";
  const $ = (s) => document.querySelector(s);
  const t = (key) => window.I18N[lang][key] ?? key;
  const L = (obj) => obj[lang];
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    const lt = $("#lang-toggle");
    lt.textContent = t("lang.toggle");
    lt.setAttribute("aria-label", t("lang.label"));

    $("#now-list").innerHTML = data.now.map(([e, txt]) => `<li><span aria-hidden="true">${e}</span><span>${esc(L(txt))}</span></li>`).join("");
    $("#facts").innerHTML = data.facts.map(([k, v]) => `<div><dt>${esc(t(k))}</dt><dd>${esc(L(v))}</dd></div>`).join("");
    $("#education").innerHTML = data.education.map((e) =>
      `<li><span class="when">${esc(L(e.when))}</span><h4>${esc(L(e.school))}</h4><p>${esc(L(e.degree))}</p></li>`).join("");

    $("#filters").innerHTML = filters.map((f) =>
      `<button type="button" data-filter="${f}" aria-pressed="${f === filter}">${esc(t("filter." + f))}</button>`).join("");
    $("#project-grid").innerHTML = data.projects.map((p) => `
      <article class="card project reveal${visible(p) ? "" : " hidden"}" data-cat="${p.cat.join(" ")}">
        <div class="project-top"><span class="emoji" aria-hidden="true">${p.emoji}</span><span class="badge">${esc(L(p.badge))}</span></div>
        <h3>${esc(L(p.title))}</h3>
        <p>${esc(L(p.text))}</p>
        <div class="tags">${p.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        ${p.link ? `<a class="more" href="${p.link}" target="_blank" rel="noopener">${esc(t("project.view"))}</a>` : ""}
      </article>`).join("");

    $("#skill-groups").innerHTML = data.skills.map(([title, items]) =>
      `<div class="card skill-group reveal"><h3>${esc(L(title))}</h3><div class="chips">${items.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>`).join("");
    $("#languages").innerHTML = data.languages.map(([name, lvl, w]) =>
      `<li><div class="row"><span>${esc(L(name))}</span><span class="lvl">${esc(L(lvl))}</span></div><div class="bar"><i style="--w:${w}%"></i></div></li>`).join("");
    $("#certs").innerHTML = data.certs.map((c) =>
      `<li class="card"><h4>📜 ${esc(L(c.title))}</h4><p>${esc(L(c.meta))}</p></li>`).join("");
    $("#community-grid").innerHTML = data.clubs.map((c) =>
      `<article class="card club reveal"><span class="when">${esc(L(c.when))}</span><h3>${esc(L(c.name))}</h3><p>${esc(L(c.text))}</p></article>`).join("");

    observeReveals();
  }

  const visible = (p) => filter === "all" || p.cat.includes(filter);

  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-filter]");
    if (!b) return;
    filter = b.dataset.filter;
    document.querySelectorAll("#filters button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll(".project").forEach((card, i) => card.classList.toggle("hidden", !visible(data.projects[i])));
  });

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "tr" : "en";
    store.set("lang", lang);
    render();
  });

  // ---------- theme ----------
  $("#theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.dataset.theme = current === "light" ? "dark" : "light";
    store.set("theme", root.dataset.theme);
    sim.refreshColors();
  });

  // ---------- nav ----------
  const nav = $("#nav");
  const links = $("#nav-links");
  const menu = $("#menu-toggle");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 24), { passive: true });
  menu.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); }
  });
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

  // ---------- reveal on scroll ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
  }

  $("#year").textContent = new Date().getFullYear();

  // ---------- hero simulation: A* path planning + lidar ----------
  const sim = (() => {
    const canvas = $("#sim");
    const ctx = canvas.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = 30;
    const SPEED = 3.2; // cells per second
    const RANGE = 7; // lidar range in cells
    let cols, rows, grid, path, car, goal, points, colors, running = true, raf = 0, last = 0, sweep = 0;

    const idx = (x, y) => y * cols + x;
    const free = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows && !grid[idx(x, y)];

    function refreshColors() {
      const cs = getComputedStyle(document.documentElement);
      const v = (n) => cs.getPropertyValue(n).trim();
      colors = { bg: v("--bg"), grid: v("--grid"), obs: v("--obstacle"), edge: v("--obstacle-edge"), accent: v("--accent"), text: v("--text") };
      if (reduced && car) draw();
    }

    function setup() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL); rows = Math.ceil(h / CELL);
      grid = new Uint8Array(cols * rows);
      for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.16 ? 1 : 0;
      const start = randomFree(Math.floor(cols * 0.55));
      car = { x: start.x, y: start.y, cx: start.x, cy: start.y, heading: 0 };
      points = [];
      newGoal();
      if (reduced) { scan(Math.PI * 2, 0); draw(); }
    }

    function randomFree(minX = 0) {
      for (let tries = 0; tries < 500; tries++) {
        const x = minX + Math.floor(Math.random() * (cols - minX)), y = 1 + Math.floor(Math.random() * (rows - 2));
        if (free(x, y)) return { x, y };
      }
      grid.fill(0);
      return { x: Math.floor(cols * 0.7), y: Math.floor(rows / 2) };
    }

    // A* on an 8-connected grid; diagonals may not cut corners.
    function astar(sx, sy, gx, gy) {
      const n = cols * rows;
      const g = new Float32Array(n).fill(Infinity);
      const from = new Int32Array(n).fill(-1);
      const closed = new Uint8Array(n);
      const open = [idx(sx, sy)];
      const h = (x, y) => { const dx = Math.abs(x - gx), dy = Math.abs(y - gy); return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy); };
      const f = new Float32Array(n).fill(Infinity);
      g[open[0]] = 0; f[open[0]] = h(sx, sy);
      while (open.length) {
        let bi = 0;
        for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[bi]]) bi = i;
        const cur = open[bi];
        open[bi] = open[open.length - 1]; open.pop();
        if (closed[cur]) continue;
        closed[cur] = 1;
        const cx = cur % cols, cy = (cur / cols) | 0;
        if (cx === gx && cy === gy) {
          const out = [];
          for (let c = cur; c !== -1; c = from[c]) out.push({ x: c % cols, y: (c / cols) | 0 });
          return out.reverse();
        }
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = cx + dx, ny = cy + dy;
          if (!free(nx, ny)) continue;
          if (dx && dy && (!free(cx + dx, cy) || !free(cx, cy + dy))) continue;
          const ni = idx(nx, ny);
          const ng = g[cur] + (dx && dy ? Math.SQRT2 : 1);
          if (ng < g[ni]) { g[ni] = ng; f[ni] = ng + h(nx, ny); from[ni] = cur; open.push(ni); }
        }
      }
      return null;
    }

    function newGoal() {
      for (let tries = 0; tries < 30; tries++) {
        goal = randomFree();
        if (Math.hypot(goal.x - car.x, goal.y - car.y) < Math.min(cols, rows) * 0.4) continue;
        path = astar(car.x, car.y, goal.x, goal.y);
        if (path) { path.shift(); return; }
      }
      path = [];
    }

    function replan() {
      if (!free(goal.x, goal.y)) return newGoal();
      const p = astar(car.x, car.y, goal.x, goal.y);
      if (p) { p.shift(); path = p; } else newGoal();
    }

    // Cast rays across `width` radians starting at `from`; hits become fading points.
    function scan(width, from) {
      const rays = Math.ceil(width / 0.05);
      const ox = car.cx + 0.5, oy = car.cy + 0.5;
      for (let r = 0; r < rays; r++) {
        const a = from + (r / rays) * width;
        const dx = Math.cos(a), dy = Math.sin(a);
        for (let d = 0.6; d < RANGE; d += 0.2) {
          const x = ox + dx * d, y = oy + dy * d;
          const gx = Math.floor(x), gy = Math.floor(y);
          if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) break;
          if (grid[idx(gx, gy)]) { points.push({ x: x * CELL, y: y * CELL, t: 0 }); break; }
        }
      }
    }

    function step(dt) {
      if (!path.length) { car.x = Math.round(car.cx); car.y = Math.round(car.cy); newGoal(); return; }
      const next = path[0];
      const dx = next.x - car.cx, dy = next.y - car.cy;
      const dist = Math.hypot(dx, dy);
      const move = SPEED * dt;
      const target = Math.atan2(dy, dx);
      let diff = target - car.heading;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      car.heading += diff * Math.min(1, dt * 10);
      if (dist <= move) { car.cx = next.x; car.cy = next.y; car.x = next.x; car.y = next.y; path.shift(); }
      else { car.cx += (dx / dist) * move; car.cy += (dy / dist) * move; }

      sweep += dt * 5;
      scan(0.9, car.heading + Math.sin(sweep) * 1.1 - 0.45);
      for (const p of points) p.t += dt;
      points = points.filter((p) => p.t < 1.4);
    }

    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = colors.grid; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= cols; x++) { ctx.moveTo(x * CELL + 0.5, 0); ctx.lineTo(x * CELL + 0.5, h); }
      for (let y = 0; y <= rows; y++) { ctx.moveTo(0, y * CELL + 0.5); ctx.lineTo(w, y * CELL + 0.5); }
      ctx.stroke();

      ctx.fillStyle = colors.obs; ctx.strokeStyle = colors.edge;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        if (!grid[idx(x, y)]) continue;
        ctx.beginPath(); ctx.roundRect(x * CELL + 3, y * CELL + 3, CELL - 6, CELL - 6, 5); ctx.fill(); ctx.stroke();
      }

      // planned path
      if (path.length) {
        ctx.strokeStyle = colors.accent; ctx.globalAlpha = 0.55; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
        ctx.beginPath(); ctx.moveTo((car.cx + 0.5) * CELL, (car.cy + 0.5) * CELL);
        for (const p of path) ctx.lineTo((p.x + 0.5) * CELL, (p.y + 0.5) * CELL);
        ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      }

      // goal marker
      const gx = (goal.x + 0.5) * CELL, gy = (goal.y + 0.5) * CELL;
      ctx.strokeStyle = colors.accent; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(gx, gy, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx - 14, gy); ctx.lineTo(gx + 14, gy); ctx.moveTo(gx, gy - 14); ctx.lineTo(gx, gy + 14); ctx.stroke();

      // lidar returns
      ctx.fillStyle = colors.accent;
      for (const p of points) {
        ctx.globalAlpha = Math.max(0, 1 - p.t / 1.4);
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // car
      ctx.save();
      ctx.translate((car.cx + 0.5) * CELL, (car.cy + 0.5) * CELL);
      ctx.rotate(car.heading);
      ctx.fillStyle = colors.accent; ctx.globalAlpha = 0.12;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, RANGE * CELL * 0.6, -0.5, 0.5); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.text;
      ctx.beginPath(); ctx.roundRect(-13, -8, 26, 16, 5); ctx.fill();
      ctx.fillStyle = colors.bg; ctx.fillRect(3, -6, 6, 12);
      ctx.fillStyle = colors.accent; ctx.beginPath(); ctx.arc(-3, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

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
      const x = Math.floor((e.clientX - r.left) / CELL), y = Math.floor((e.clientY - r.top) / CELL);
      if (x < 0 || y < 0 || x >= cols || y >= rows) return;
      if (Math.abs(x - Math.round(car.cx)) <= 0 && Math.abs(y - Math.round(car.cy)) <= 0) return;
      grid[idx(x, y)] ^= 1;
      // Snap the car to its cell so planning starts from a free grid cell.
      car.x = Math.round(car.cx); car.y = Math.round(car.cy);
      if (!free(car.x, car.y)) { grid[idx(car.x, car.y)] = 0; }
      replan();
      if (reduced) { points = []; scan(Math.PI * 2, 0); draw(); }
    });

    let resizeTimer;
    addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    });

    new IntersectionObserver(([en]) => play(en.isIntersecting && !document.hidden)).observe(canvas);
    document.addEventListener("visibilitychange", () => play(!document.hidden));

    refreshColors();
    setup();
    if (!reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } else running = false;

    return { refreshColors };
  })();

  render();
})();
