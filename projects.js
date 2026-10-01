/* Project catalog
   ----------------------------------------------------
   Add new work here once; the homepage preview and /projects.html
   both render from this same list. */
const PROJECTS = [
  {
    name: "Lexa",
    kind: "Legal AI platform",
    status: "Building",
    featured: true,
    description: "A Turkmenistan-focused legal assistant that identifies a citizen’s issue, asks for missing facts, and prepares formal documents for institutions or court workflows.",
    tags: ["FastAPI", "Next.js", "LangGraph", "PostgreSQL", "Qdrant"],
    githubUrl: "https://github.com/romanamangeldiyev/Lexa",
    liveUrl: ""
  },
  {
    name: "PlatoMind",
    kind: "Education platform prototype",
    status: "Prototype",
    featured: true,
    description: "An agora for rethinking education — a discussion product for students, professors, teachers, parents, researchers, psychiatrists, and philosophers.",
    tags: ["React", "JavaScript", "Product Design", "Education"],
    githubUrl: "https://github.com/romanamangeldiyev/platomind",
    liveUrl: ""
  },
  {
    name: "NatPat Support Agents",
    kind: "Multi-agent AI system",
    status: "Hackathon",
    featured: true,
    description: "A policy-driven multi-agent customer-support system with triage, tool execution, response generation, escalation, session memory, and end-to-end tracing.",
    tags: ["Python", "FastAPI", "Gemini", "Agents", "Docker"],
    githubUrl: "https://github.com/romanamangeldiyev/Lookfor_Hackathon_2026_KIEV",
    liveUrl: ""
  },
  {
    name: "Allincome",
    kind: "AI fintech",
    status: "Closed",
    featured: false,
    description: "A fintech product built to unify freelancer and creator income streams, analyze them with AI, and turn fragmented financial data into actionable recommendations.",
    tags: ["Next.js", "TypeScript", "AI", "Fintech", "Full-stack"],
    githubUrl: "https://github.com/romanamangeldiyev/allincome",
    liveUrl: ""
  }
];

(function () {
  "use strict";

  function makeLink(label, href, external) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (external) {
      link.target = "_blank";
      link.rel = "noopener";
    }

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "2");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", external ? "M7 17 17 7M8 7h9v9" : "M5 12h14M13 6l6 6-6 6");
    icon.appendChild(path);
    link.appendChild(icon);
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
    if (project.liveUrl) links.appendChild(makeLink("Open app", project.liveUrl, true));
    if (project.githubUrl) links.appendChild(makeLink("GitHub", project.githubUrl, true));

    card.append(top, title, kind, desc, tags, links);
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
