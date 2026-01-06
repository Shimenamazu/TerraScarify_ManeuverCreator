//

//値

//パネル
const panel = document.getElementById("slide-panel");
const panel_btn = document.getElementById("toggleBtn");

panel_btn.addEventListener("click", () => {
  panel.classList.toggle("open");
});
