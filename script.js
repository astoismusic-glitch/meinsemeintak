const spotifyArtistUrl = "https://open.spotify.com/artist/1jpZ9Rmt16ImOSEJRJj5rn?si=VWIA7MAyTzemQu_xSzkndw";
const appleMusicUrl = "https://music.apple.com/in/artist/astromanish/1723091621";

const upcomingTracks = [
  "KAUN TERA",
  "BOL TO SAHI",
  "PAINTING PICTURE",
  "HAVE A NICE DAY feat. 13RNG",
  "AM I MUMBLING",
  "NO REGRETS",
  "WILL YOU CRY FOR ME(WHAT CAN YOU DO IF YOU LOVE ME)",
  "Needed feat. Sam",
  "chehra",
  "28 freestyle",
  "Palak Jhapkte",
  "MAI OR MAI feat. anand",
  "SAMURAI feat satyam",
  "GOOD BY feat. Roshan",
  "FAMILY MATTERS TOO",
  "tohe prem mai (freestyle on that time)",
  "Anti-Social",
  "Meri dost (sun lo)",
  "808",
  "fuck are love",
  "mai se mai tak",
  "no sense of love",
  "SWAPAN NAGRI feat. Anand",
  "Too close to the moon feat. Satyam",
  "NARAYANAYE",
  "Step In My Hood",
  "reunion",
  "SHEHER MOHALI",
  "EK KAVITA TUMAHRE LIYE",
  "ISTREE",
  "Ma PA",
  "not so bad"
];

const upcomingTracksJapanese = [
  "君は誰",
  "言ってみて",
  "絵を描く",
  "良い一日を",
  "つぶやいてるか",
  "後悔なし",
  "泣いてくれるか",
  "必要",
  "顔",
  "28 フリースタイル",
  "瞬き",
  "私と私",
  "侍",
  "さよなら",
  "家族のことも",
  "恋の中で",
  "反社会的",
  "友よ聞いて",
  "808",
  "愛とは何だ",
  "私から私へ",
  "愛の意味なし",
  "夢の街",
  "月に近すぎる",
  "ナラヤナ",
  "俺の街へ",
  "再会",
  "モハリの街",
  "君への詩",
  "女性",
  "母",
  "悪くない"
];

const catalog = {
  albums: [
    {
      type: "Album",
      title: "AstroManish on Spotify",
      note: "Explore albums, releases, and full track links directly from the official Spotify profile.",
      tracks: []
    }
  ],
  singles: [
    {
      type: "Single",
      title: "AstroManish Singles",
      note: "Listen to current singles and new songs from the official Spotify artist page.",
      tracks: []
    }
  ],
  eps: [
    {
      type: "EP",
      title: "Apple Music Profile",
      note: "Open the AstroManish Apple Music page for streaming, library saves, and platform discovery.",
      tracks: []
    }
  ]
};

const upcomingList = document.querySelector("#upcomingTracks");
const upcomingPanel = document.querySelector(".upcoming-panel");
const upcomingTrigger = document.querySelector(".upcoming-trigger");
const unreleasedPanel = document.querySelector(".unreleased-panel");
const unreleasedTrigger = document.querySelector(".unreleased-trigger");
const tabs = document.querySelectorAll(".tab");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const modal = document.querySelector("#trackModal");
const modalTitle = document.querySelector("#modalTitle");
const modalType = document.querySelector("#modalType");
const modalTracks = document.querySelector("#modalTracks");
const donateModal = document.querySelector("#donateModal");
const heroTrackName = document.querySelector("#heroTrackName");
const floatingTrackNames = document.querySelector("#floatingTrackNames");

function renderUpcoming() {
  upcomingList.innerHTML = upcomingTracks
    .map((track, index) => `<li><span class="track-en">${track}</span><span class="track-jp">${upcomingTracksJapanese[index]}</span></li>`)
    .join("");

  floatingTrackNames.innerHTML = [...upcomingTracks, ...upcomingTracks]
    .map((track) => `<span>${track}</span>`)
    .join("");
}

function renderCatalog() {
  Object.entries(catalog).forEach(([key, releases]) => {
    const container = document.querySelector(`#${key}`);
    container.innerHTML = releases.map((release, index) => {
      const initials = release.title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);

      return `
        <article class="release-card reveal" tabindex="0" data-category="${key}" data-index="${index}">
          <div class="cover" aria-hidden="true">${initials}</div>
          <p class="eyebrow">${release.type}</p>
          <h3>${release.title}</h3>
          <p>${release.note}</p>
          <a class="button ghost" href="${key === "eps" ? appleMusicUrl : spotifyArtistUrl}" target="_blank" rel="noreferrer">${key === "eps" ? "Open Apple Music" : "Open Spotify"}</a>
        </article>
      `;
    }).join("");
  });
}

function openModal(release) {
  modalTitle.textContent = release.title;
  modalType.textContent = release.type;

  if (release.tracks.length) {
    modalTracks.innerHTML = release.tracks
      .map((track) => `<li><a href="${track.url}" target="_blank" rel="noreferrer">${track.title}</a></li>`)
      .join("");
  } else {
    const releaseUrl = release.type === "EP" ? appleMusicUrl : spotifyArtistUrl;
    const releaseLabel = release.type === "EP" ? "Open AstroManish on Apple Music" : "Open AstroManish on Spotify";
    modalTracks.innerHTML = `<li><a href="${releaseUrl}" target="_blank" rel="noreferrer">${releaseLabel}</a></li>`;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openDonateModal() {
  donateModal.classList.add("open");
  donateModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDonateModal() {
  donateModal.classList.remove("open");
  donateModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupInteractions() {
  upcomingTrigger.addEventListener("click", () => {
    const isOpen = upcomingPanel.classList.toggle("open");
    upcomingTrigger.setAttribute("aria-expanded", String(isOpen));
  });

  unreleasedTrigger.addEventListener("click", () => {
    const isOpen = unreleasedPanel.classList.toggle("open");
    unreleasedTrigger.setAttribute("aria-expanded", String(isOpen));
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
        item.setAttribute("aria-selected", String(item === tab));
      });
      document.querySelectorAll(".catalog-grid").forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });

  document.addEventListener("click", (event) => {
    const card = event.target.closest(".release-card");
    if (!card || event.target.closest("a")) return;

    const release = catalog[card.dataset.category][Number(card.dataset.index)];
    openModal(release);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }

    if (event.key === "Escape" && donateModal.classList.contains("open")) {
      closeDonateModal();
    }

    if ((event.key === "Enter" || event.key === " ") && document.activeElement.classList.contains("release-card")) {
      event.preventDefault();
      const card = document.activeElement;
      const release = catalog[card.dataset.category][Number(card.dataset.index)];
      openModal(release);
    }
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.querySelectorAll("[data-open-donate]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openDonateModal();
    });
  });

  document.querySelectorAll("[data-close-donate]").forEach((button) => {
    button.addEventListener("click", closeDonateModal);
  });

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".anime-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const className = icon.dataset.power === "beam" ? "beam-on" : "slash-on";
      icon.classList.remove("beam-on", "slash-on");
      void icon.offsetWidth;
      icon.classList.add(className);

      window.setTimeout(() => {
        icon.classList.remove(className);
      }, 1300);
    });
  });

  document.querySelectorAll(".audio-card audio").forEach((audio) => {
    audio.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    audio.addEventListener("play", () => {
      document.querySelectorAll(".audio-card").forEach((card) => card.classList.remove("playing"));
      audio.closest(".audio-card").classList.add("playing");
    });

    audio.addEventListener("pause", () => {
      audio.closest(".audio-card").classList.remove("playing");
    });

    audio.addEventListener("ended", () => {
      audio.closest(".audio-card").classList.remove("playing");
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupTrackRotation() {
  let index = 0;

  window.setInterval(() => {
    index = (index + 1) % upcomingTracks.length;
    heroTrackName.textContent = upcomingTracks[index];
  }, 2200);
}

function setupVisualizer() {
  const canvas = document.querySelector("#visualizer");
  const context = canvas.getContext("2d");
  const bars = 72;
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);

    for (let index = 0; index < bars; index += 1) {
      const progress = index / bars;
      const wave = Math.sin(time * 0.0018 + index * 0.42) * 0.5 + 0.5;
      const barHeight = 34 + wave * 160;
      const x = progress * width;
      const y = height - barHeight - 32;
      const gradient = context.createLinearGradient(0, y, 0, y + barHeight);

      gradient.addColorStop(0, "rgba(241, 194, 75, 0.48)");
      gradient.addColorStop(0.45, "rgba(210, 13, 38, 0.32)");
      gradient.addColorStop(1, "rgba(107, 29, 122, 0.12)");

      context.fillStyle = gradient;
      context.fillRect(x, y, Math.max(2, width / bars - 8), barHeight);
    }

    animationFrame = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  animationFrame = requestAnimationFrame(draw);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
    }
  });
}

function setupSakura() {
  const canvas = document.querySelector("#sakura");
  const context = canvas.getContext("2d");
  const petals = [];
  const petalCount = 54;
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createPetal(resetY = false) {
    return {
      x: Math.random() * width,
      y: resetY ? -40 - Math.random() * height : Math.random() * height,
      size: 7 + Math.random() * 9,
      speed: 0.45 + Math.random() * 1.2,
      sway: 0.5 + Math.random() * 1.8,
      rotate: Math.random() * Math.PI * 2,
      spin: -0.025 + Math.random() * 0.05,
      alpha: 0.48 + Math.random() * 0.42,
      tint: Math.random() > 0.9 ? "gold" : "pink"
    };
  }

  function seedPetals() {
    petals.length = 0;
    for (let i = 0; i < petalCount; i += 1) petals.push(createPetal());
  }

  function drawPetal(petal) {
    context.save();
    context.translate(petal.x, petal.y);
    context.rotate(petal.rotate);
    context.globalAlpha = petal.alpha;
    const gradient = context.createRadialGradient(0, 0, 1, 0, 0, petal.size);
    gradient.addColorStop(0, petal.tint === "gold" ? "#fff4c5" : "#fff7fa");
    gradient.addColorStop(0.52, petal.tint === "gold" ? "#f1c24b" : "#ffd1dc");
    gradient.addColorStop(1, petal.tint === "gold" ? "#a66d13" : "#b81d39");
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(0, -petal.size);
    context.bezierCurveTo(petal.size * 0.82, -petal.size * 0.58, petal.size * 0.68, petal.size * 0.5, 0, petal.size);
    context.bezierCurveTo(-petal.size * 0.72, petal.size * 0.36, -petal.size * 0.82, -petal.size * 0.55, 0, -petal.size);
    context.fill();
    context.globalAlpha = petal.alpha * 0.38;
    context.strokeStyle = "#ffffff";
    context.lineWidth = 0.7;
    context.beginPath();
    context.moveTo(0, -petal.size * 0.58);
    context.lineTo(0, petal.size * 0.52);
    context.stroke();
    context.restore();
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    petals.forEach((petal, index) => {
      petal.y += petal.speed;
      petal.x += Math.sin((petal.y + index * 22) * 0.012) * petal.sway;
      petal.rotate += petal.spin;

      if (petal.y > height + 40 || petal.x < -40 || petal.x > width + 40) {
        petals[index] = createPetal(true);
      }

      drawPetal(petal);
    });

    animationFrame = requestAnimationFrame(draw);
  }

  resize();
  seedPetals();
  window.addEventListener("resize", () => {
    resize();
    seedPetals();
  });
  animationFrame = requestAnimationFrame(draw);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
    }
  });
}

function setupMusicNotes() {
  const canvas = document.querySelector("#musicNotes");
  const context = canvas.getContext("2d");
  const notes = [];
  const symbols = ["♪", "♫", "♬", "♩"];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = Math.min(210, window.innerWidth * 0.34);
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createNote(resetY = false) {
    return {
      x: 18 + Math.random() * (width - 38),
      y: resetY ? -30 - Math.random() * height : Math.random() * height,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: 16 + Math.random() * 14,
      speed: 0.28 + Math.random() * 0.72,
      sway: 0.25 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.28 + Math.random() * 0.42
    };
  }

  function seedNotes() {
    notes.length = 0;
    for (let index = 0; index < 16; index += 1) notes.push(createNote());
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    notes.forEach((note, index) => {
      note.y += note.speed;
      note.x += Math.sin(note.y * 0.018 + note.phase) * note.sway;

      if (note.y > height + 40) notes[index] = createNote(true);

      context.save();
      context.globalAlpha = note.alpha;
      context.fillStyle = index % 4 === 0 ? "#f1c24b" : "#fff8ee";
      context.shadowColor = index % 4 === 0 ? "rgba(241, 194, 75, 0.75)" : "rgba(190, 85, 255, 0.72)";
      context.shadowBlur = 14;
      context.font = `700 ${note.size}px "Noto Serif JP", serif`;
      context.fillText(note.symbol, note.x, note.y);
      context.restore();
    });

    animationFrame = requestAnimationFrame(draw);
  }

  resize();
  seedNotes();
  window.addEventListener("resize", () => {
    resize();
    seedNotes();
  });
  animationFrame = requestAnimationFrame(draw);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
    }
  });
}

renderUpcoming();
renderCatalog();
setupInteractions();
setupReveal();
setupTrackRotation();
setupVisualizer();
setupSakura();
setupMusicNotes();
