(function () {
  const root = document.documentElement;
  const storageKey = "labs-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".theme-toggle");
    const label = document.querySelector(".theme-label");

    applyTheme(getPreferredTheme());
    updateLabel();
    
// FIND THIS SECTION IN YOUR theme.js
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    const iconContainer = document.querySelector(".theme-icon-container"); // ADD THIS
    
    label.classList.add("fade");
    if (iconContainer) iconContainer.classList.add("fade"); // ADD THIS

    setTimeout(() => {
      const current = getCurrentTheme();
      const next = current === "dark" ? "light" : "dark";

      localStorage.setItem(storageKey, next);
      applyTheme(next);
      updateLabel();

      label.classList.remove("fade");
      if (iconContainer) iconContainer.classList.remove("fade"); // ADD THIS
    }, 150);
  });
}
    function updateLabel() {
      const current = getCurrentTheme();
      label.textContent = current === "dark" ? "Light" : "Dark";
    }
  });
})();
