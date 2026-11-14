(function () {
  "use strict";
  var cfg = window.HYLACORE || { email: "", social: {} };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- social links (only those configured in config.js) ---------- */
  var PLATFORMS = [
    ["whatsapp", "WhatsApp", "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.300A10 10 0 1 0 12 2zm0 1.800a8.2 8.2 0 1 1-4.2 15.200l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.800zM8.5 7.300c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.300s1 2.7 1.1 2.900c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.3.2-.700.2-1.2.2-1.300l-.5-.3-1.7-.8c-.2-.1-.4-.1-.600.100l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.2 0-.4.1-.5l.4-.4.2-.4c.1-.200 0-.3 0-.5l-.800-1.900c-.2-.5-.4-.4-.600-.4z"],
    ["telegram", "Telegram", "M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.200c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.4-.1-.5-.6-.2L6.6 12.800l-4.7-1.500c-1-.3-1-1 .2-1.500L20.6 2.700c.9-.3 1.6.2 1.3 1.600z"],
    ["facebook", "Facebook", "M13.5 22v-8.200h2.800l.4-3.200h-3.200V8.500c0-.9.3-1.6 1.6-1.600h1.700V4.100c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.200v2.400H7.400v3.200h2.800V22z"],
    ["tiktok", "TikTok", "M16.6 2h-3.300v13.500a2.9 2.9 0 1 1-2.9-2.900c.3 0 .6 0 .8.1V9.300a6.2 6.2 0 1 0 5.4 6.200V8.700a7.6 7.6 0 0 0 4.4 1.400V6.800A4.4 4.4 0 0 1 16.6 2z"],
    ["instagram", "Instagram", "M12 7.300a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.400zm0 7.700a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.200zM16.2 3H7.800A4.8 4.8 0 0 0 3 7.800v8.400A4.8 4.8 0 0 0 7.8 21h8.400a4.8 4.8 0 0 0 4.8-4.800V7.800A4.8 4.8 0 0 0 16.2 3zm3.1 13.200a3.1 3.1 0 0 1-3.1 3.100H7.800a3.1 3.1 0 0 1-3.1-3.100V7.800a3.1 3.1 0 0 1 3.1-3.100h8.400a3.1 3.1 0 0 1 3.1 3.100z"],
    ["x", "X", "M17.7 3h3.100l-6.8 7.800L22 21h-6.300l-4.9-6.400L5.2 21H2.100l7.3-8.300L1.7 3h6.400l4.4 5.900zm-1.1 16.200h1.700L7.2 4.700H5.400z"],
    ["linkedin", "LinkedIn", "M6.9 8.600H3.500V20h3.400zM5.2 3.500a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20.5 13.500c0-3.1-1.7-5.2-4.4-5.200a3.8 3.8 0 0 0-3.3 1.800V8.600H9.500V20h3.400v-6.100c0-1.6.8-2.6 2.1-2.600s2 .9 2 2.600V20h3.500z"],
    ["youtube", "YouTube", "M21.6 7.200a2.5 2.5 0 0 0-1.8-1.800C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.800C2 8.8 2 12 2 12s0 3.2.4 4.800a2.5 2.5 0 0 0 1.8 1.800C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.800c.4-1.6.4-4.8.4-4.800s0-3.2-.4-4.800zM10 15V9l5.2 3z"]
  ];
  var active = PLATFORMS.filter(function (p) {
    var u = (cfg.social || {})[p[0]];
    return typeof u === "string" && /^https:\/\//.test(u.trim());
  });
  document.querySelectorAll("[data-socials]").forEach(function (box) {
    active.forEach(function (p) {
      var a = document.createElement("a");
      a.href = cfg.social[p[0]].trim();
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "HylaCore on " + p[1]);
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + p[2] + '"/></svg><span>' + p[1] + "</span>";
      box.appendChild(a);
    });
  });
  document.querySelectorAll("[data-if-socials]").forEach(function (el) { el.hidden = !active.length; });

  /* ---------- email ---------- */
  document.querySelectorAll("[data-email]").forEach(function (a) {
    a.href = "mailto:" + cfg.email;
    if (a.hasAttribute("data-email-text")) a.textContent = cfg.email;
  });
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- nav ---------- */
  var nav = document.querySelector(".nav");
  var links = document.querySelector(".nav-links");
  var burger = document.querySelector(".burger");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  function setMenu(open) {
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }
  if (burger) {
    burger.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  }

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    rv.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* ---------- card spotlight ---------- */
  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---------- contact form -> opens the visitor's mail app ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "[HylaCore] " + d.get("topic") + " — " + d.get("name");
      var body = d.get("message") + "\n\n—\n" + d.get("name") + "\n" + d.get("email");
      window.location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- hero neural network ---------- */
  var canvas = document.getElementById("net");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var W, H, dpr, nodes = [], mouse = { x: -9999, y: -9999 }, raf = 0, visible = true;
  var LINK = 150;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.max(36, Math.min(120, Math.round(W * H / 13000)));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.34, vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.7 + 0.7, hot: Math.random() < 0.14, ph: Math.random() * 6.28
      });
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, dx, dy, d;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      if (!reduce) {
        a.x += a.vx; a.y += a.vy;
        dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 170 && d > 0.1) { a.x += dx / d * (170 - d) * 0.012; a.y += dy / d * (170 - d) * 0.012; }
        if (a.x < -20) a.x = W + 20; else if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; else if (a.y > H + 20) a.y = -20;
      }
    }
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
        if (d < LINK * LINK) {
          var o = (1 - Math.sqrt(d) / LINK);
          // fade the network out on the left so the headline stays readable
          var fade = 0.25 + 0.75 * Math.min(1, ((a.x + b.x) / 2) / (W * 0.75));
          ctx.strokeStyle = "rgba(90,235,190," + (o * 0.34 * fade).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      var f = 0.3 + 0.7 * Math.min(1, a.x / (W * 0.75));
      if (a.hot) {
        var p = 0.6 + 0.4 * Math.sin(t / 700 + a.ph);
        ctx.fillStyle = "rgba(182,255,106," + (0.16 * p * f).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r * 5.5, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(200,255,140," + (0.95 * f).toFixed(3) + ")";
      } else {
        ctx.fillStyle = "rgba(120,235,205," + (0.7 * f).toFixed(3) + ")";
      }
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
    }
    if (!reduce && visible) raf = requestAnimationFrame(frame);
  }

  resize();
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { resize(); if (reduce) frame(0); }, 150);
  });
  canvas.parentElement.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      var was = visible; visible = en[0].isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(frame);
    }).observe(canvas);
  }
  raf = requestAnimationFrame(frame);
})();
