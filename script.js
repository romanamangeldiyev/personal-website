/* Roman Amangeldiyev — personal site
   ----------------------------------------------------
   CV_URL: replace "#" below with your Google Drive (or PDF) link.
   While it stays "#", both "View CV" buttons stay hidden rather than
   rendering as buttons that do nothing when clicked.           */
const CV_URL = "#";

(function () {
  "use strict";

  // mark JS active so reveal animations apply (without JS, content stays visible)
  document.documentElement.classList.add("js");

  let started = false;
  document.addEventListener("DOMContentLoaded", init);
  // in case the script is loaded after DOMContentLoaded already fired
  if (document.readyState !== "loading") init();

  function init() {
    if (started) return;
    started = true;

    /* ---- footer year ---- */
    const yr = document.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();

    /* ---- nav scrolled border ---- */
    const nav = document.getElementById("nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---- reveal on scroll ---- */
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
    });
    const showInView = () => {
      const vh = window.innerHeight || 800;
      reveals.forEach((el) => {
        if (el.classList.contains("in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
      // Safety net that does not disable later reveals: once everything has
      // loaded, show whatever is already on screen. Elements further down the
      // page still animate in on scroll, as intended.
      window.addEventListener("load", showInView);
    } else {
      // No IntersectionObserver: fall back to a scroll handler, and after a
      // moment reveal everything so content can never be stranded.
      showInView();
      window.addEventListener("scroll", showInView, { passive: true });
      window.addEventListener("load", showInView);
      setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1500);
    }

    /* ---- portrait: reveal only once loaded (no empty glow during load) ---- */
    (function () {
      const pimg = document.querySelector(".portrait img");
      if (!pimg) return;
      const mark = () => {
        const p = pimg.closest(".portrait");
        if (p) p.classList.add("img-loaded");
      };
      if (pimg.complete && pimg.naturalWidth) mark();
      else {
        pimg.addEventListener("load", mark);
        pimg.addEventListener("error", mark);
      }
      setTimeout(mark, 2500); // safety: never leave it hidden
    })();

    /* ---- CV buttons ----
       They ship with the `hidden` attribute. Reveal them only once CV_URL is a
       real link, so visitors never meet a button that does nothing. */
    const cvReady = CV_URL && CV_URL !== "#";
    ["cvBtnHero", "cvBtnContact"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (cvReady) {
        el.setAttribute("href", CV_URL);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    /* ---- active nav link on scroll ---- */
    (function () {
      const links = Array.from(document.querySelectorAll(".navlinks a"));
      const map = {};
      links.forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return;
        const id = href.slice(1);
        const sec = document.getElementById(id);
        if (sec) map[id] = a;
      });
      const sections = Object.keys(map).map((id) => document.getElementById(id));
      if ("IntersectionObserver" in window) {
        const so = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                links.forEach((a) => a.classList.remove("active"));
                const a = map[e.target.id];
                if (a) a.classList.add("active");
              }
            });
          },
          { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        sections.forEach((s) => so.observe(s));
      }
    })();

    /* ---- scroll-to-top ---- */
    (function () {
      const tt = document.getElementById("toTop");
      if (!tt) return;
      const toggle = () => tt.classList.toggle("show", window.scrollY > 600);
      window.addEventListener("scroll", toggle, { passive: true });
      toggle();
      tt.addEventListener("click", () => {
        const reduce =
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      });
    })();
  }
})();

/* ---- olympiad awards enhancement ----
   Keeps the original award text in HTML as a no-JS fallback, then upgrades the
   section visually and links to a dedicated crawlable awards page. */
(function () {
  "use strict";

  function enhanceAwards() {
    const honors = document.querySelector(".honors");
    if (!honors) return;

    if (!document.querySelector('link[href="awards.css"]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "awards.css";
      document.head.appendChild(stylesheet);
    }

    const label = honors.querySelector(".honors-head .hk");
    const heading = honors.querySelector(".honors-head h3");
    if (label) label.textContent = "Olympiad recognition";
    if (heading) heading.innerHTML = "Olympiad <em>honors</em>";

    if (!honors.querySelector(".honors-intro")) {
      const intro = document.createElement("p");
      intro.className = "honors-intro";
      intro.textContent = "Two academic recognitions issued by the Turkmenistan Ministry of Education — an early record of competition, problem solving, and building discipline.";
      const head = honors.querySelector(".honors-head");
      if (head) head.insertAdjacentElement("afterend", intro);
    }

    const awards = [
      {
        year: "2021",
        title: "Sustainable Future",
        issuer: "Turkmenistan Ministry of Education · February 2021",
        kind: "Olympiad recognition"
      },
      {
        year: "2020",
        title: "Programming Contest",
        issuer: "Turkmenistan Ministry of Education · March 2020",
        kind: "Programming · Olympiad recognition"
      }
    ];

    honors.querySelectorAll(".honor-card").forEach((card, index) => {
      const award = awards[index];
      if (!award) return;
      card.innerHTML = `
        <div class="award-topline">
          <div>
            <div class="award-kicker">${award.kind}</div>
          </div>
          <div class="hy" aria-hidden="true">${award.year}</div>
        </div>
        <div class="star" aria-hidden="true">★</div>
        <div class="ht">${award.title}</div>
        <div class="hs">${award.issuer}</div>
      `;
    });

    if (!honors.querySelector(".honors-more")) {
      const more = document.createElement("a");
      more.className = "honors-more";
      more.href = "awards.html";
      more.setAttribute("aria-label", "View Roman Amangeldiyev olympiad awards");
      more.textContent = "View olympiad awards →";
      honors.appendChild(more);
    }
  }

  document.addEventListener("DOMContentLoaded", enhanceAwards);
  if (document.readyState !== "loading") enhanceAwards();
})();
