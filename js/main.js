(() => {
  "use strict";

  // ---------- content ----------
  // Every visible piece of content lives here. Text fields are { en, tr }.
  const data = {
    heroWords: {
      en: ["Autonomous ground vehicles", "Simulation and route planning", "Swarm UAVs", "Polar research", "Real-time CARLA simulation"],
      tr: ["Otonom kara araçları", "Simülasyon ve rota planlama", "Sürü İHA", "Kutup araştırmaları", "CARLA'da gerçek zamanlı simülasyon"],
    },
    about: [
      {
        en: "I am a second-year Computer Engineering student at Ankara University, working on autonomous ground vehicles and the software that lets perception, localization and planning run together on a real platform.",
        tr: "Ankara Üniversitesi Bilgisayar Mühendisliği ikinci sınıf öğrencisiyim. Otonom kara araçları ve algı, konumlama ve planlama katmanlarının gerçek bir araç üzerinde birlikte çalışmasını sağlayan yazılımlar üzerine çalışıyorum.",
      },
      {
        en: "Through TEKNOFEST I have worked on a full autonomy stack for a passenger vehicle. What interests me most in these systems is the engineering that makes them dependable: clear interfaces between modules, repeatable tests and simulations that reflect the field.",
        tr: "TEKNOFEST kapsamında bir binek araç için uçtan uca otonom sürüş yazılımı üzerinde çalıştım. Bu sistemlerde beni en çok, onları güvenilir kılan mühendislik ilgilendiriyor: modüller arasında net arayüzler, tekrarlanabilir testler ve sahayı doğru yansıtan simülasyonlar.",
      },
      {
        en: "I also build web applications and take an active part in student communities at my university.",
        tr: "Bunun yanında web uygulamaları geliştiriyor, üniversitemdeki öğrenci topluluklarında aktif olarak yer alıyorum.",
      },
    ],
    facts: [
      ["facts.location", { en: "Ankara, Türkiye", tr: "Ankara, Türkiye" }],
      ["facts.university", { en: "Ankara University", tr: "Ankara Üniversitesi" }],
      ["facts.focus", { en: "Autonomous systems, web", tr: "Otonom sistemler, web" }],
    ],
    education: [
      {
        tile: "AÜ",
        title: { en: "Ankara University", tr: "Ankara Üniversitesi" },
        meta: { en: "B.Sc. Computer Engineering · 2025 – present", tr: "Bilgisayar Mühendisliği, lisans · 2025 – devam ediyor" },
        stat: { value: "3.23", label: { en: "GPA", tr: "Ortalama" } },
      },
    ],
    experience: [
      {
        tile: "MTA",
        title: { en: "National Technology Workshop (MTA)", tr: "Milli Teknoloji Atölyesi (MTA)" },
        meta: { en: "Workshop tracking system · Frontend development", tr: "Atölye takip sistemi · Frontend geliştirme" },
        text: {
          en: "I work on the frontend of the workshop's tracking system, a progressive web app where students request materials and workshop staff manage approvals and hand-overs.",
          tr: "Atölyenin takip sisteminin frontend tarafında çalışıyorum: öğrencilerin malzeme talep ettiği, atölye çalışanlarının onay ve teslim süreçlerini yönettiği bir progresif web uygulaması.",
        },
        tags: ["React", "TypeScript", "Vite", "TanStack", "Tailwind CSS", "Keycloak"],
      },
    ],
    competitions: [
      {
        title: { en: "TEKNOFEST 2026 Robotaxi Passenger Autonomous Vehicle Competition", tr: "TEKNOFEST 2026 Robotaksi Binek Otonom Araç Yarışması" },
        meta: { en: "Ready-made vehicle category · Team AUtomotion-R", tr: "Hazır araç kategorisi · AUtomotion-R takımı" },
        badge: { en: "Finalist", tr: "Finalist" },
        text: {
          en: "An end-to-end autonomy stack for the BEE1 passenger vehicle, built for static and dynamic traffic scenarios on a closed track: passenger pick-ups in a set order, obstacle avoidance and parking.",
          tr: "BEE1 binek aracı için, kapalı pistte statik ve dinamik trafik senaryolarına yönelik uçtan uca otonom sürüş yazılımı: belirli sırayla yolcu alma, engelden kaçınma ve park etme.",
        },
        role: {
          en: "Started on the autonomous bus-stop manoeuvre: detecting the stop sign, entering the bay on a wide arc so the rear wheels clear the kerb, confirming a full stop with IMU data and rejoining the lane. Later grew to cover the architecture of the whole system.",
          tr: "İşe otonom durak manevrasıyla başladım: durak tabelasını algılama, arka tekerlekler kaldırıma çarpmadan geniş bir yayla cebe girme, tam duruşu IMU verisiyle doğrulama ve şeride geri dönme. Sonrasında sistemin tüm mimarisine hâkim oldum.",
        },
        pipeline: [
          ["perception", { en: "Perception", tr: "Algı" }, {
            en: "Lane detection with a CLRerNet model fine-tuned on track data, traffic sign and light detection with YOLO, and Velodyne lidar processing that reports the nearest obstacle in each zone around the vehicle.",
            tr: "Pist verisiyle ince ayar yapılmış CLRerNet modeliyle şerit algılama, YOLO ile trafik işareti ve ışık tespiti, Velodyne LiDAR verisinden aracın çevresindeki her bölge için en yakın engelin çıkarılması.",
          }],
          ["localization", { en: "Localization", tr: "Konumlama" }, {
            en: "Map-frame pose from an Xsens MTi GNSS/INS unit, supported by wheel odometry.",
            tr: "Xsens MTi GNSS/INS biriminden harita çerçevesinde poz kestirimi, teker odometrisiyle destekleniyor.",
          }],
          ["planning", { en: "Planning", tr: "Planlama" }, {
            en: "A* routing between map zones, Lanelet2 centre-line following and a behaviour tree for decisions such as overtaking and parking. Without RTK, GNSS error (1.5 m) is half of a 3.1 m lane, so the map defines the path shape while the camera measures lateral offset.",
            tr: "Harita bölgeleri arasında A* ile rota, Lanelet2 merkez hattı takibi, sollama ve park gibi kararlar için davranış ağacı. RTK olmadan GNSS hatası (1,5 m) 3,1 m'lik şeridin yarısına denk geldiği için yolun şeklini harita, yanal kaymayı kamera belirliyor.",
          }],
          ["control", { en: "Control", tr: "Kontrol" }, {
            en: "Lane following and overtaking controller, the only node that writes steering and throttle commands to the vehicle's CAN bus.",
            tr: "Şerit takibi ve sollama kontrolcüsü; aracın CAN hattına direksiyon ve gaz komutu yazan tek düğüm.",
          }],
          ["deployment", { en: "Deployment", tr: "Dağıtım" }, {
            en: "ROS 2 Foxy packaged as a single GPU Docker image on the vehicle, with a simulation bridge and scenario tests for each competition day.",
            tr: "Araçta tek bir GPU'lu Docker imajı olarak çalışan ROS 2 Foxy; simülasyon köprüsü ve her yarışma günü için senaryo testleri.",
          }],
        ],
        tags: ["ROS 2", "Python", "C++", "PyTorch", "Lanelet2", "Docker", "CAN"],
      },
    ],
    // Code for these stays private; they are described here only.
    activeProjects: [
      {
        title: { en: "Unmanned Ground Vehicle (İKA)", tr: "İnsansız Kara Aracı (İKA)" },
        role: { en: "Team captain", tr: "Takım kaptanı" },
        text: {
          en: "TEKNOFEST unmanned ground vehicle project. I lead the team, and I modelled the vehicle in Blender for use in our Gazebo simulation of the competition course.",
          tr: "TEKNOFEST İnsansız Kara Aracı projesi. Takımı yönetiyorum; aracı Blender üzerinde modelledim ve yarışma parkurunun Gazebo simülasyonunda kullanıyoruz.",
        },
        tags: ["ROS 2", "Gazebo", "Blender", "Python"],
      },
      {
        title: { en: "Advanced Autonomous Systems", tr: "İleri Otonom Sistemler" },
        role: { en: "Simulation · Route planning", tr: "Simülasyon · Rota planlama" },
        text: {
          en: "TEKNOFEST Advanced Autonomous Systems project. I work on simulation and route planning, including a Gazebo and RViz test field: a 50×50 m rubble area with seed-generated corridors and a scoring measure.",
          tr: "TEKNOFEST İleri Otonom Sistemler projesi. Simülasyon ve rota planlama kısımlarıyla uğraşıyorum; tohumdan üretilen koridorlara sahip 50×50 m moloz sahasını ve puanlama ölçümünü içeren Gazebo + RViz test ortamı bunlardan biri.",
        },
        tags: ["ROS 2", "Gazebo", "RViz", "Python", "Hybrid A*"],
      },
      {
        title: { en: "Swarm UAV", tr: "Sürü İHA" },
        text: { en: "Active 2026 project on unmanned aerial vehicles flying as a swarm.", tr: "Sürü halinde uçan insansız hava araçları üzerine aktif 2026 projesi." },
        tags: [],
      },
      {
        title: { en: "Polar Research", tr: "Kutup Araştırmaları" },
        role: { en: "Team captain", tr: "Takım kaptanı" },
        text: { en: "Active 2026 project within TÜBİTAK polar research.", tr: "TÜBİTAK kutup araştırmaları kapsamında aktif 2026 projesi." },
        tags: [],
      },
      {
        title: { en: "Robotaxi: Original Vehicle", tr: "Robotaksi Özgün" },
        role: { en: "Simulation", tr: "Simülasyon" },
        text: {
          en: "I am currently building a real-time simulation in CARLA, connected to the autonomy stack through a ROS 2 bridge.",
          tr: "Şu anda CARLA üzerinde, otonom sürüş yazılımına ROS 2 köprüsüyle bağlı gerçek zamanlı bir simülasyon geliştiriyorum.",
        },
        tags: ["CARLA", "ROS 2", "Python", "Blender"],
      },
    ],
    projects: [
      {
        title: { en: "MTA Workshop Inventory", tr: "MTA Atölye Malzeme Takip Sistemi" },
        text: {
          en: "Simplified inventory and request system for the workshop. Students request parts, and coordinators approve and hand them out.",
          tr: "Atölye için sadeleştirilmiş malzeme ve talep sistemi. Öğrenciler talep oluşturur, koordinatörler onaylayıp teslim eder.",
        },
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/yigitozc/mta-atolye-takip",
      },
      {
        title: { en: "Personal website", tr: "Kişisel web sitesi" },
        text: {
          en: "This site. The simulation at the top implements frontier-based exploration: lidar ray casting, an occupancy grid, A* replanning and path tracking, with no libraries.",
          tr: "Bu site. Üstteki simülasyon sınır tabanlı keşfi uyguluyor: LiDAR ışın izleme, doluluk ızgarası, A* ile yeniden planlama ve yol takibi; harici kütüphane kullanılmadan.",
        },
        tags: ["HTML", "CSS", "JavaScript", "Canvas"],
        link: "https://github.com/yigitozc/yigitozc.github.io",
      },
    ],
    // Described on the site, but their source code is not published.
    otherProjects: [
      {
        title: { en: "Edge AI Perception Pod", tr: "Edge AI Otonom Algı Podu" },
        text: {
          en: "HackAntarktika project: an edge AI perception module for polar field conditions.",
          tr: "HackAntarktika projesi: kutup saha koşulları için uç yapay zekâ tabanlı bir algı modülü.",
        },
        tags: ["Edge AI"],
      },
      {
        title: { en: "MTA Tracking Platform", tr: "MTA Takip Platformu" },
        text: {
          en: "Team project and the full-scale workshop tracking system, with a separate frontend, an API gateway, a Java backend and end-to-end tests. I work on the frontend.",
          tr: "Atölye takip sisteminin tam ölçekli sürümü olan takım projesi: ayrı frontend, API gateway, Java backend ve uçtan uca testler. Frontend tarafında çalışıyorum.",
        },
        tags: ["React", "TypeScript", "Java", "Playwright"],
      },
    ],
    skills: [
      [{ en: "Programming", tr: "Programlama" }, ["Python", "C++", "Java", "JavaScript", "TypeScript"]],
      [{ en: "Robotics", tr: "Robotik" }, ["ROS 2", "Gazebo", "CARLA", "RViz", "YOLO", "OpenCV", "Blender"]],
      [{ en: "Web", tr: "Web" }, ["React", "HTML", "CSS", "Tailwind CSS", "Vite"]],
      [{ en: "Tools", tr: "Araçlar" }, ["Linux", "Docker", "Git", "Maven", "Playwright"]],
    ],
    languages: [
      { code: "TR", greet: "Merhaba", name: { en: "Turkish", tr: "Türkçe" }, level: { en: "Native", tr: "Ana dil" }, w: 100 },
      { code: "EN", greet: "Hello", name: { en: "English", tr: "İngilizce" }, level: { en: "Limited working proficiency", tr: "Sınırlı mesleki yeterlilik" }, w: 55 },
      { code: "JP", greet: "こんにちは", name: { en: "Japanese", tr: "Japonca" }, level: { en: "Elementary proficiency", tr: "Başlangıç seviyesi" }, w: 22 },
    ],
    certs: [
      {
        tile: "PY",
        title: { en: "Programming with Python", tr: "Python ile Programlama Eğitimi" },
        meta: { en: "MATHCOM, Ankara University · November 2025", tr: "MATHCOM, Ankara Üniversitesi · Kasım 2025" },
      },
    ],
    communities: [
      {
        tile: "CORE",
        title: { en: "CORE Student Community", tr: "CORE Öğrenci Topluluğu" },
        meta: { en: "Board Member · Ankara University · 2025 – present", tr: "Yönetim Kurulu Üyesi · Ankara Üniversitesi · 2025 – devam ediyor" },
      },
    ],
  };

  const ICONS = {
    perception: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    localization: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    planning: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    control: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    deployment: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  };

  // ---------- storage (may be unavailable) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // ---------- i18n + rendering ----------
  let lang = store.get("lang") === "tr" ? "tr" : "en";
  const $ = (s) => document.querySelector(s);
  const t = (key) => window.I18N[lang][key] ?? key;
  const L = (obj) => obj[lang];
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const delay = (i) => `style="--d:${Math.min(i, 5) * 70}ms"`;
  const tags = (list) => `<div class="tags">${list.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`;

  const rowCard = (e, i = 0) => `
    <article class="card row-card lift reveal" ${delay(i)}>
      <span class="tile" aria-hidden="true">${esc(e.tile)}</span>
      <div>
        <h3>${esc(L(e.title))}</h3>
        <p class="meta">${esc(L(e.meta))}</p>
        ${e.text ? `<p class="text">${esc(L(e.text))}</p>` : ""}
        ${e.tags ? tags(e.tags) : ""}
      </div>
      ${e.stat ? `<div class="stat"><strong>${esc(e.stat.value)}</strong><span>${esc(L(e.stat.label))}</span></div>` : ""}
    </article>`;

  const projectCard = (p, i) => {
    const badge = p.role ? L(p.role) : p.tags.length === 0 ? "" : t(p.link ? "project.badgeOpen" : "project.badgePrivate");
    return `
    <article class="card project lift reveal" ${delay(i)}>
      <div class="project-top">
        <h4>${esc(L(p.title))}</h4>
        ${badge ? `<span class="badge${p.link || p.role ? " accent" : ""}">${esc(badge)}</span>` : ""}
      </div>
      <p>${esc(L(p.text))}</p>
      ${p.tags.length ? tags(p.tags) : ""}
      ${p.link ? `<a class="more" href="${p.link}" target="_blank" rel="noopener">${esc(t("project.view"))}</a>` : ""}
    </article>`;
  };

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    const lt = $("#lang-toggle");
    lt.textContent = t("lang.toggle");
    lt.setAttribute("aria-label", t("lang.label"));
    $("#theme-toggle").setAttribute("aria-label", t("theme.label"));
    $("#menu-toggle").setAttribute("aria-label", t("menu.label"));

    $("#about-text").innerHTML = data.about.map((p) => `<p>${esc(L(p))}</p>`).join("");
    $("#facts").innerHTML = data.facts.map(([k, v]) => `<div><dt>${esc(t(k))}</dt><dd>${esc(L(v))}</dd></div>`).join("");
    $("#education").innerHTML = data.education.map(rowCard).join("");
    $("#experience-list").innerHTML = data.experience.map(rowCard).join("");
    $("#competition-list").innerHTML = data.competitions.map((c) => `
      <article class="card feature reveal">
        <div class="feature-head">
          <div>
            <h3>${esc(L(c.title))}</h3>
            <p class="meta">${esc(L(c.meta))}</p>
          </div>
          <span class="badge accent">${esc(L(c.badge))}</span>
        </div>
        <p class="text">${esc(L(c.text))}</p>
        <div class="role"><strong>${esc(t("competition.role"))}</strong><p>${esc(L(c.role))}</p></div>
        <ul class="pipeline">${c.pipeline.map(([icon, name, text]) => `
          <li>
            <div class="head"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[icon]}</svg>${esc(L(name))}</div>
            <p>${esc(L(text))}</p>
          </li>`).join("")}
        </ul>
        ${tags(c.tags)}
      </article>`).join("");
    $("#project-list").innerHTML = `
      <h3 class="label reveal">${esc(t("projects.active"))}</h3>
      <div class="project-grid thirds">${data.activeProjects.map(projectCard).join("")}</div>
      <h3 class="label reveal">${esc(t("projects.open"))}</h3>
      <div class="project-grid">${data.projects.map(projectCard).join("")}</div>
      <h3 class="label reveal">${esc(t("projects.other"))}</h3>
      <div class="project-grid">${data.otherProjects.map(projectCard).join("")}</div>`;
    $("#skill-list").innerHTML = data.skills.map(([title, items], i) => `
      <div class="card skill-group lift reveal" ${delay(i)}>
        <h3>${esc(L(title))}</h3>
        <div class="chips">${items.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      </div>`).join("");
    $("#language-list").innerHTML = data.languages.map((l, i) => `
      <article class="card lang-card lift reveal" ${delay(i)}>
        <div class="ring" style="--w:${l.w}">
          <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27"/><circle class="value" cx="32" cy="32" r="27" pathLength="100"/></svg>
          <span>${l.code}</span>
        </div>
        <div>
          <p class="greet" lang="${l.code === "JP" ? "ja" : l.code.toLowerCase()}">${esc(l.greet)}</p>
          <h4>${esc(L(l.name))}</h4>
          <p class="lvl">${esc(L(l.level))}</p>
        </div>
      </article>`).join("");
    $("#cert-list").innerHTML = data.certs.map(rowCard).join("");
    $("#community-list").innerHTML = data.communities.map(rowCard).join("");
    paintHud();
    startRotator();
  }

  // ---------- hero name and rotating line ----------
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let rotatorTimer = 0;

  function startRotator() {
    clearTimeout(rotatorTimer);
    const el = $("#rotator-text"), words = L(data.heroWords);
    if (calm) { el.textContent = words[0]; return; }
    let w = 0, n = 0, erasing = false;
    const tick = () => {
      n += erasing ? -1 : 1;
      el.textContent = words[w].slice(0, n);
      let wait = erasing ? 26 : 55;
      if (!erasing && n === words[w].length) { erasing = true; wait = 1900; }
      else if (erasing && n === 0) { erasing = false; w = (w + 1) % words.length; wait = 280; }
      rotatorTimer = setTimeout(tick, wait);
    };
    tick();
  }

  // Letters swell and warm up near the cursor; without one, a wave runs through them.
  function setupName() {
    const h1 = $("#name"), name = h1.textContent;
    h1.setAttribute("aria-label", name);
    let index = 0;
    h1.innerHTML = name.split(" ").map((word) => `<span class="word" aria-hidden="true">${[...word].map((c) => `<span class="ch" style="animation-delay:${index++ * 45}ms">${c}</span>`).join("")}</span>`).join("");
    if (calm) return;

    const letters = [...h1.querySelectorAll(".ch")];
    const hero = $(".hero");
    const BASE = 560, RANGE = 210, RADIUS = 115, WAVE_EVERY = 6500, WAVE_FOR = 1500;
    let pointer = null, raf = 0, visible = false;
    const start = performance.now() + 1100;

    function frame(now) {
      const rects = pointer ? letters.map((l) => l.getBoundingClientRect()) : null;
      const phase = (now - start) % WAVE_EVERY;
      letters.forEach((l, i) => {
        let p = 0;
        if (rects) {
          const d = Math.hypot(rects[i].left + rects[i].width / 2 - pointer.x, rects[i].top + rects[i].height / 2 - pointer.y);
          p = Math.max(0, 1 - d / RADIUS);
        } else if (now > start && phase < WAVE_FOR) {
          const pos = (phase / WAVE_FOR) * (letters.length + 4) - 2;
          p = Math.exp(-((i - pos) ** 2) / 3);
        }
        l.style.fontWeight = Math.round(BASE + p * RANGE);
        l.style.setProperty("--p", p.toFixed(3));
      });
      if (visible) raf = requestAnimationFrame(frame);
    }

    hero.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY }; });
    hero.addEventListener("pointerleave", () => { pointer = null; });
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    }).observe(h1);
  }

  // ---------- reveal on scroll ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  const observeReveals = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "tr" : "en";
    store.set("lang", lang);
    render();
    // Freshly rendered cards shouldn't replay their entrance on a language switch.
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
  });

  // ---------- theme ----------
  $("#theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.dataset.theme = current === "light" ? "dark" : "light";
    store.set("theme", root.dataset.theme);
    sim.refreshColors();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => sim.refreshColors());

  // ---------- nav ----------
  const links = $("#nav-links");
  const menu = $("#menu-toggle");
  const closeMenu = () => { links.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => menu.setAttribute("aria-expanded", links.classList.toggle("open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

  $("#year").textContent = new Date().getFullYear();

  // ---------- simulation readout ----------
  let hud = null;
  function paintHud() {
    if (!hud) return;
    $("#hud-status").textContent = t("sim." + hud.status);
    $("#hud-explored").textContent = hud.explored + "%";
    $("#hud-speed").textContent = hud.speed.toFixed(1) + " m/s";
    $("#hud-planner").textContent = hud.planMs.toFixed(1) + " ms";
  }

  const sim = window.createSim($("#sim"), (state) => { hud = state; paintHud(); });

  setupName();
  render();
  observeReveals();
})();
