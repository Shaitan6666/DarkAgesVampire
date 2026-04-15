export function setupNavigation(loadPage) {
  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      loadPage(btn.dataset.page);
    });
  });
}
