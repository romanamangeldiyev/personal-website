/* Project catalog
   ----------------------------------------------------
   Add new work here once; the homepage preview and /projects.html
   both render from this same list. */
const PROJECTS = [
  {
    name: "Jev AI Experiment",
    kind: "Decision-model prototype",
    status: "Prototype",
    featured: true,
    description: "A 25-profile experiment testing whether Jev can reason over structured symptom data without a local matching engine, local scoring, or a fallback layer.",
    focus: "Product experiment · AI evaluation · Structured decisions",
    tags: ["Jev", "Decision Models", "Structured Data", "AI Evaluation"],
    githubUrl: "",
    githubDisabled: false,
    technicalUrl: "project-jev-ai.html",
    liveUrl: "https://roman.s.gy/jev-ai"
  },
  {
    name: "Lexa",
    kind: "Legal AI platform",
    status: "Building",
    featured: true,
    description: "A Turkmenistan-focused legal product exploring how ordinary-language legal problems can become structured, reviewable workflows and formal documents.",
    focus: "Product discovery · Legal AI · Workflow design",
    tags: ["FastAPI", "Next.js", "LangGraph", "PostgreSQL", "Qdrant"],
    githubUrl: "https://github.com/romanamangeldiyev/Lexa",
    githubDisabled: false,
    technicalUrl: "project-lexa.html",
    liveUrl: ""
  },
  {
    name: "PlatoMind",
    kind: "Education platform prototype",
    status: "Prototype",
    featured: true,
    description: "A product experiment for structured debate around education, designed to bring students, educators, parents, researchers, and other stakeholders into the same conversation.",
    focus: "Product design · Community systems · Education",
    tags: ["React", "JavaScript", "Product Design", "Education"],
    githubUrl: "https://github.com/romanamangeldiyev/platomind",
    githubDisabled: true,
    technicalUrl: "project-platomind.html",
    liveUrl: ""
  }
];

(function () {
  "use strict";

  function makeIcon(external) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "2");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", external ? "M7 17 17 7M8 7h9v9" : "M5 12h14M13 6l6 6-6 6");
    icon.appendChild(path);
    return icon;
  }

  function makeLink(label, href, external) {
    const link = document.createElement("a");
    link.href = href;
    link.append(document.createTextNode(label), makeIcon(external));
    if (external) {
      link.target = "_blank";
      link.rel = "noopener";
    }
    return link;
  }

  function makeDisabledLink(label) {
    const link = document.createElement("span");
    link.className = "project-link-disabled";
    link.setAttribute("aria-disabled", "true");
    link.title = "Repository link is currently disabled";
    link.append(document.createTextNode(label), makeIcon(true));
    return link;
  }

  function makeCard(project, index) {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    const top = document.createElement("div");
    top.className = "project-card-top";

    const idx = document.createElement("span");
    idx.className = "project-index";
    idx.textContent = "/" + String(index + 1).padStart(2, "0");

    const status = document.createElement("span");
    status.className = "project-status";
    status.textContent = project.status;

    top.append(idx, status);

    const title = document.createElement("h3");
    title.textContent = project.name;

    const kind = document.createElement("div");
    kind.className = "project-kind";
    kind.textContent = project.kind;

    const focus = document.createElement("div");
    focus.className = "project-focus";
    focus.textContent = project.focus || "";

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.tags.forEach(function (tag) {
      const span = document.createElement("span");
      span.textContent = tag;
      tags.appendChild(span);
    });

    const links = document.createElement("div");
    links.className = "project-links";

    if (project.technicalUrl) {
      links.appendChild(makeLink("Case study", project.technicalUrl, false));
    }
    if (project.liveUrl) {
      links.appendChild(makeLink("Open app", project.liveUrl, true));
    }
    if (project.githubUrl) {
      links.appendChild(
        project.githubDisabled
          ? makeDisabledLink("GitHub")
          : makeLink("GitHub", project.githubUrl, true)
      );
    }

    card.append(top, title, kind, focus, desc, tags, links);
    return card;
  }

  function renderProjects() {
    const featured = document.getElementById("featuredProjects");
    if (featured) {
      PROJECTS.filter(function (project) { return project.featured; })
        .slice(0, 3)
        .forEach(function (project, index) {
          featured.appendChild(makeCard(project, index));
        });
    }

    const all = document.getElementById("allProjects");
    if (all) {
      PROJECTS.forEach(function (project, index) {
        all.appendChild(makeCard(project, index));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProjects);
  } else {
    renderProjects();
  }
})();
