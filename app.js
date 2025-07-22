// Animate the title on load using GSAP
gsap.from("#animated-title", {
  duration: 1.8,
  y: 50,
  opacity: 0,
  ease: "power3.out",
});

// Custom cursor setup
const cursor = document.getElementById("custom-cursor");

function updateCursor(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
}
document.addEventListener("mousemove", updateCursor);

// Hide cursor on touch devices
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
if (isTouchDevice()) {
  document.body.classList.add("no-cursor");
}

// Expand/collapse team bios
const cards = document.querySelectorAll(".card.expandable");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", !expanded);
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});
