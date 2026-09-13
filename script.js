(() => {
  "use strict";

  document.addEventListener("mousemove", (event) => {
    document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }

  const moreProjects = document.getElementById("more-projects");
  const loadMoreButton = document.getElementById("load-more-btn");

  if (moreProjects && loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      const isHidden = moreProjects.hasAttribute("hidden");

      if (isHidden) {
        moreProjects.removeAttribute("hidden");
        moreProjects.querySelectorAll(".reveal").forEach((item) => item.classList.add("active"));
        loadMoreButton.textContent = "Voir moins";
        loadMoreButton.setAttribute("aria-expanded", "true");
      } else {
        moreProjects.setAttribute("hidden", "");
        loadMoreButton.textContent = "Voir plus de projets";
        loadMoreButton.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
