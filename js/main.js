(() => {
  "use strict";

  // ---------- content ----------
  // Every visible piece of content lives here. Text fields are { en, tr }.
  const data = {
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
    education: [
      {
        school: { en: "Ankara University", tr: "Ankara Üniversitesi" },
        meta: { en: "B.Sc. Computer Engineering · 2025 – present", tr: "Bilgisayar Mühendisliği, lisans · 2025 – devam ediyor" },
      },
    ],
    competitions: [
      {
        title: { en: "TEKNOFEST 2026 Robotaxi Passenger Autonomous Vehicle Competition", tr: "TEKNOFEST 2026 Robotaksi Binek Otonom Araç Yarışması" },
        meta: { en: "Ready-made vehicle category · Team AUtomotion-R · Finalist", tr: "Hazır araç kategorisi · AUtomotion-R takımı · Finalist" },
        text: {
          en: "An end-to-end autonomy stack for the BEE1 passenger vehicle, built for static and dynamic traffic scenarios on a closed track: passenger pick-ups in a set order, obstacle avoidance and parking.",
          tr: "BEE1 binek aracı için, kapalı pistte statik ve dinamik trafik senaryolarına yönelik uçtan uca otonom sürüş yazılımı: belirli sırayla yolcu alma, engelden kaçınma ve park etme.",
        },
        spec: [
          [{ en: "My role", tr: "Katkım" }, {
            en: "Started on the autonomous bus-stop manoeuvre: detecting the stop sign, entering the bay on a wide arc so the rear wheels clear the kerb, confirming a full stop with IMU data and rejoining the lane. Later grew to cover the architecture of the whole system.",
            tr: "İşe otonom durak manevrasıyla başladım: durak tabelasını algılama, arka tekerlekler kaldırıma çarpmadan geniş bir yayla cebe girme, tam duruşu IMU verisiyle doğrulama ve şeride geri dönme. Sonrasında sistemin tüm mimarisine hâkim oldum.",
          }],
          [{ en: "Perception", tr: "Algı" }, {
            en: "Lane detection with a CLRerNet model fine-tuned on track data, traffic sign and light detection with YOLO, and Velodyne lidar processing that reports the nearest obstacle in each zone around the vehicle.",
            tr: "Pist verisiyle ince ayar yapılmış CLRerNet modeliyle şerit algılama, YOLO ile trafik işareti ve ışık tespiti, Velodyne LiDAR verisinden aracın çevresindeki her bölge için en yakın engelin çıkarılması.",
          }],
          [{ en: "Localization", tr: "Konumlama" }, {
            en: "Map-frame pose from an Xsens MTi GNSS/INS unit, supported by wheel odometry.",
            tr: "Xsens MTi GNSS/INS biriminden harita çerçevesinde poz kestirimi, teker odometrisiyle destekleniyor.",
          }],
          [{ en: "Planning", tr: "Planlama" }, {
            en: "A* routing between map zones, Lanelet2 centre-line following and a behaviour tree for decisions such as overtaking and parking. Without RTK, GNSS error (1.5 m) is half of a 3.1 m lane, so the map defines the path shape while the camera measures lateral offset.",
            tr: "Harita bölgeleri arasında A* ile rota, Lanelet2 merkez hattı takibi, sollama ve park gibi kararlar için davranış ağacı. RTK olmadan GNSS hatası (1,5 m) 3,1 m'lik şeridin yarısına denk geldiği için yolun şeklini harita, yanal kaymayı kamera belirliyor.",
          }],
          [{ en: "Control", tr: "Kontrol" }, {
            en: "Lane following and overtaking controller, the only node that writes steering and throttle commands to the vehicle's CAN bus.",
            tr: "Şerit takibi ve sollama kontrolcüsü; aracın CAN hattına direksiyon ve gaz komutu yazan tek düğüm.",
          }],
          [{ en: "Deployment", tr: "Dağıtım" }, {
            en: "ROS 2 Foxy packaged as a single GPU Docker image on the vehicle, with a simulation bridge and scenario tests for each competition day.",
            tr: "Araçta tek bir GPU'lu Docker imajı olarak çalışan ROS 2 Foxy; simülasyon köprüsü ve her yarışma günü için senaryo testleri.",
          }],
        ],
        stack: "ROS 2 · Python · C++ · PyTorch · Lanelet2 · Docker · CAN",
      },
    ],
    projects: [
      {
        title: { en: "MTA Workshop Inventory", tr: "MTA Atölye Malzeme Takip Sistemi" },
        text: {
          en: "Inventory and request system for the National Technology Workshop. Students request parts, and coordinators approve and hand them out.",
          tr: "Milli Teknoloji Atölyesi için malzeme ve talep sistemi. Öğrenciler talep oluşturur, koordinatörler onaylayıp teslim eder.",
        },
        stack: "HTML · CSS · JavaScript",
        link: "https://github.com/yigitozc/mta-atolye-takip",
      },
      {
        title: { en: "Personal website", tr: "Kişisel web sitesi" },
        text: {
          en: "This site. The simulation at the top implements frontier-based exploration: lidar ray casting, an occupancy grid, A* replanning and path tracking, with no libraries.",
          tr: "Bu site. Üstteki simülasyon sınır tabanlı keşfi uyguluyor: LiDAR ışın izleme, doluluk ızgarası, A* ile yeniden planlama ve yol takibi; harici kütüphane kullanılmadan.",
        },
        stack: "HTML · CSS · JavaScript · Canvas",
        link: "https://github.com/yigitozc/yigitozc.github.io",
      },
    ],
    // Described on the site, but their source code is not published.
    otherProjects: [
      {
        title: { en: "HTAB İKA Simulation", tr: "HTAB İKA Simülasyonu" },
        text: {
          en: "Gazebo and RViz test field for the unmanned ground vehicle stage of TEKNOFEST Advanced Autonomous Systems: a 50×50 m rubble field with seed-generated corridors and a scoring measure.",
          tr: "TEKNOFEST İleri Otonom Sistemler yarışmasının insansız kara aracı aşaması için Gazebo ve RViz test sahası: tohumdan üretilen koridorlara sahip 50×50 m moloz alanı ve puanlama ölçümü.",
        },
        stack: "ROS 2 · Gazebo · RViz · Python",
      },
      {
        title: { en: "Edge AI Perception Pod", tr: "Edge AI Otonom Algı Podu" },
        text: {
          en: "HackAntarktika project: an edge AI perception module for polar field conditions.",
          tr: "HackAntarktika projesi: kutup saha koşulları için uç yapay zekâ tabanlı bir algı modülü.",
        },
        stack: "YOLO · IMU · Docker",
      },
      {
        title: { en: "MTA Management Platform", tr: "MTA Yönetim Platformu" },
        text: {
          en: "Team project and the full-scale version of the workshop system, with a separate frontend, an API gateway, a Java backend and end-to-end tests.",
          tr: "Atölye sisteminin tam ölçekli sürümü olan takım projesi: ayrı frontend, API gateway, Java backend ve uçtan uca testler.",
        },
        stack: "Java · Maven · Playwright",
      },
      {
        title: { en: "Mola Boutique Café", tr: "Mola Butik Kafe" },
        text: {
          en: "Café website without a framework. The menu and occupancy status load from JSON, with an automatic slider and accessible dialogs.",
          tr: "Framework kullanılmadan yazılmış kafe sitesi. Menü ve doluluk durumu JSON'dan yükleniyor; otomatik slayt ve erişilebilir modal pencereler içeriyor.",
        },
        stack: "HTML · CSS · JavaScript",
      },
      {
        title: { en: "UGV 3D Model", tr: "İKA 3D Modeli" },
        text: {
          en: "Compact Blender model of the unmanned ground vehicle, with suspension and laser animations.",
          tr: "İnsansız kara aracının Blender'da hazırlanmış kompakt modeli; süspansiyon ve lazer animasyonları içeriyor.",
        },
        stack: "Blender",
      },
    ],
    skills: [
      [{ en: "Programming", tr: "Programlama" }, "Python, C++, Java, JavaScript, HTML, CSS"],
      [{ en: "Robotics", tr: "Robotik" }, "ROS 2, Gazebo, CARLA, RViz, YOLO, OpenCV, Blender"],
      [{ en: "Tools", tr: "Araçlar" }, "Linux, Docker, Git, Maven, Playwright"],
    ],
    languages: [
      [{ en: "Turkish", tr: "Türkçe" }, { en: "Native", tr: "Ana dil" }],
      [{ en: "English", tr: "İngilizce" }, { en: "Limited working proficiency", tr: "Sınırlı mesleki yeterlilik" }],
      [{ en: "Japanese", tr: "Japonca" }, { en: "Elementary proficiency", tr: "Başlangıç seviyesi" }],
    ],
    certs: [
      {
        title: { en: "Programming with Python", tr: "Python ile Programlama Eğitimi" },
        meta: { en: "MATHCOM, Ankara University · November 2025", tr: "MATHCOM, Ankara Üniversitesi · Kasım 2025" },
      },
    ],
    communities: [
      {
        title: { en: "CORE Student Community", tr: "CORE Öğrenci Topluluğu" },
        meta: { en: "Board Member · Ankara University · 2025 – present", tr: "Yönetim Kurulu Üyesi · Ankara Üniversitesi · 2025 – devam ediyor" },
      },
      {
        title: { en: "AUtomotion-R", tr: "AUtomotion-R" },
        meta: { en: "Autonomous vehicle team", tr: "Otonom araç takımı" },
      },
      {
        title: { en: "National Technology Workshop (MTA)", tr: "Milli Teknoloji Atölyesi (MTA)" },
        meta: { en: "Ankara University", tr: "Ankara Üniversitesi" },
      },
    ],
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

  const plainEntry = (e) => `<div class="entry"><h3>${esc(L(e.title ?? e.school))}</h3><p class="meta">${esc(L(e.meta))}</p></div>`;
  const specRow = (k, v) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    const lt = $("#lang-toggle");
    lt.textContent = t("lang.toggle");
    lt.setAttribute("aria-label", t("lang.label"));
    $("#theme-toggle").setAttribute("aria-label", t("theme.label"));
    $("#menu-toggle").setAttribute("aria-label", t("menu.label"));

    $("#about-text").innerHTML = data.about.map((p) => `<p>${esc(L(p))}</p>`).join("");
    $("#education").innerHTML = data.education.map(plainEntry).join("");
    $("#competition-list").innerHTML = data.competitions.map((c) => `
      <article class="entry">
        <h3>${esc(L(c.title))}</h3>
        <p class="meta">${esc(L(c.meta))}</p>
        <p class="text">${esc(L(c.text))}</p>
        <dl class="spec">${c.spec.map(([k, v]) => specRow(L(k), L(v))).join("")}</dl>
        <p class="stack">${esc(c.stack)}</p>
      </article>`).join("");
    const projectEntry = (p) => `
      <article class="entry">
        <h3>${esc(L(p.title))}</h3>
        <p class="text">${esc(L(p.text))}</p>
        <p class="stack">${esc(p.stack)}${p.link ? ` · <a href="${p.link}" target="_blank" rel="noopener">${esc(t("project.view"))}</a>` : ""}</p>
      </article>`;
    $("#project-list").innerHTML =
      `<h3 class="label">${esc(t("projects.open"))}</h3>${data.projects.map(projectEntry).join("")}` +
      `<h3 class="label">${esc(t("projects.other"))}</h3>${data.otherProjects.map(projectEntry).join("")}`;
    $("#skill-list").innerHTML = data.skills.map(([k, v]) => specRow(L(k), v)).join("");
    $("#language-list").innerHTML = data.languages.map(([k, v]) => specRow(L(k), L(v))).join("");
    $("#cert-list").innerHTML = data.certs.map(plainEntry).join("");
    $("#community-list").innerHTML = data.communities.map(plainEntry).join("");
    paintHud();
  }

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "tr" : "en";
    store.set("lang", lang);
    render();
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

  render();
})();
