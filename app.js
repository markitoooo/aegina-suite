// Animate the title on load using GSAP
gsap.from("#animated-title", {
  duration: 1.8,
  y: 80,
  opacity: 0,
  ease: "power4.out",
  delay: 0.3,
});

// Expand/collapse team bios on click or keyboard
document.querySelectorAll(".card.expandable").forEach((card) => {
  card.addEventListener("click", () => toggleCard(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCard(card);
    }
  });
});

function toggleCard(card) {
  const expanded = card.getAttribute("aria-expanded") === "true";
  card.setAttribute("aria-expanded", !expanded);
}
