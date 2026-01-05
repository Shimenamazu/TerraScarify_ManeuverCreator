const panel = document.getElementById("slide-panel");
const btn = document.getElementById("toggleBtn");

btn.addEventListener("click", () => {
  panel.classList.toggle("open");
});
