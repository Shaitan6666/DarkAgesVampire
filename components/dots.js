export function createDots(max, value, onChange) {
  const container = document.createElement("div");
  container.className = "dots";

  for (let i = 0; i < max; i++) {
    const dot = document.createElement("span");

    // Fill initial dots
    if (i < value) dot.classList.add("filled");

    dot.addEventListener("click", () => {
      const dots = [...container.children];

      // Update UI
      dots.forEach((d, index) => {
        d.classList.toggle("filled", index <= i);
      });

      // Notify parent component
      onChange(i + 1);
    });

    container.appendChild(dot);
  }

  return container;
}