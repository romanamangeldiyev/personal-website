/* Cross-site SEO / GEO enhancements.
   The site remains fully readable without JavaScript; this layer adds identity
   links, social metadata, and structured data for richer crawler context. */
(function () {
  "use strict";

  function addMeta(name, content) {
    if (!content || document.head.querySelector(`meta[name="${name}"]`)) return;
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
  }

  function addLink(rel, href, type, title) {
    if (!href || document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (type) link.type = type;
    if (title) link.title = title;
    document.head.appendChild(link);
  }

  function addJsonLd(data, id) {
    if (id && document.getElementById(id)) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    if (id) script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function canonicalUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    return canonical ? canonical.href : window.location.href.split("#")[0];
  }

  function description() {
    const el = document.querySelector('meta[name="description"]');
    return el ? el.content : "";
  }

  function strengthenIdentityLinks() {
    const identityHosts = [
      "x.com/romangeldiyev",
      "linkedin.com/in/roman-amangeldiyev",
      "github.com/romanamangeldiyev",
      "instagram.com/romanamangeldiyev",
      "medium.com/@romanamangeldiev",
      "medium.com/@tmprogrammer"
    ];

    document.querySelectorAll("a[href]").forEach((a) => {
      const href = (a.href || "").toLowerCase();
      if (!identityHosts.some((host) => href.includes(host))) return;
      const rel = new Set((a.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("me");
      if (a.target === "_blank") rel.add("noopener");
      a.setAttribute("rel", Array.from(rel).join(" "));
    });

    document.querySelectorAll('a[href="https://x.com/romangeldiyev"],a[href="https://www.x.com/romangeldiyev"]').forEach((a) => {
      const txt = (a.textContent || "").trim();
      if (txt === "X") a.textContent = "X · @romangeldiyev";
      if (!a.getAttribute("aria-label")) a.setAttribute("aria-label", "Roman Amangeldiyev on X — @romangeldiyev");
    });
  }

  function addGlobalIdentityMetadata() {
    addMeta("twitter:creator", "@romangeldiyev");
    addLink("author", "https://romanamangeldiyev.com/profile.html");
    addLink("alternate", "https://romanamangeldiyev.com/roman-amangeldiyev.jsonld", "application/ld+json", "Roman Amangeldiyev entity data");
  }

  function addProjectStructuredData() {
    if (!document.body.classList.contains("project-detail-page")) return;

    const url = canonicalUrl();
    const h1 = document.querySelector("h1");
    const eyebrow = document.querySelector(".case-eyebrow");
    const title = h1 ? h1.textContent.trim().replace(/\s+/g, " ") : document.title;
    const desc = description();
    const external = Array.from(document.querySelectorAll('.case-actions a[href^="http"]'))
      .map((a) => a.href)
      .filter(Boolean);

    addJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": url + "#article",
          "headline": title,
          "description": desc,
          "url": url,
          "mainEntityOfPage": url,
          "dateModified": "2026-10-26",
          "author": { "@id": "https://romanamangeldiyev.com/#person" },
          "publisher": { "@id": "https://romanamangeldiyev.com/#person" },
          "image": "https://romanamangeldiyev.com/assets/og-image.jpg",
          "inLanguage": "en",
          "about": {
            "@type": "SoftwareApplication",
            "name": title,
            "description": desc,
            "applicationCategory": eyebrow ? eyebrow.textContent.trim() : "Software",
            "url": url,
            "sameAs": external
          }
        },
        {
          "@type": "Person",
          "@id": "https://romanamangeldiyev.com/#person",
          "name": "Roman Amangeldiyev",
          "url": "https://romanamangeldiyev.com/",
          "sameAs": [
            "https://www.linkedin.com/in/roman-amangeldiyev/",
            "https://x.com/romangeldiyev",
            "https://github.com/romanamangeldiyev"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://romanamangeldiyev.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Projects",
              "item": "https://romanamangeldiyev.com/projects.html"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": title,
              "item": url
            }
          ]
        }
      ]
    }, "project-seo-schema");
  }

  function addProjectsPageIdentity() {
    if (!document.body.classList.contains("projects-page")) return;
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://romanamangeldiyev.com/projects.html#profile-context",
      "url": "https://romanamangeldiyev.com/projects.html",
      "mainEntity": { "@id": "https://romanamangeldiyev.com/#person" },
      "about": { "@id": "https://romanamangeldiyev.com/#person" },
      "dateModified": "2026-10-26"
    }, "projects-profile-schema");
  }

  function run() {
    strengthenIdentityLinks();
    addGlobalIdentityMetadata();
    addProjectStructuredData();
    addProjectsPageIdentity();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
