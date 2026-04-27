const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionTitles = {
  story: "Story",
  impact: "Impact",
  work: "Work",
  projects: "Projects",
  stack: "Stack",
  education: "Education",
  contact: "Connect",
};

const trackedSections = document.querySelectorAll("main section[id], footer[id]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const activeSectionLabel = document.getElementById("active-section-label");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.id;

      if (activeSectionLabel && sectionTitles[sectionId]) {
        activeSectionLabel.textContent = sectionTitles[sectionId];
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-12% 0px -38% 0px",
  }
);

trackedSections.forEach((section) => {
  sectionObserver.observe(section);
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

document.querySelectorAll(".interactive-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 980) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
