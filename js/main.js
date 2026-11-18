//背景
const colors = {
  maneuver: "#cccccc",
  burst: "#bec8ff",
  alive: "#ffbebe",
};

const type = "alive";
document.getElementById("bg").style.backgroundColor = colors[type];

//画面分割
const splitter = document.getElementById("splitter");
const left = document.getElementById("left");

let dragging = false;

splitter.addEventListener("mousedown", () => {
  dragging = true;
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const container = splitter.parentElement;
  const rect = container.getBoundingClientRect();

  let width = e.clientX - rect.left;

  // 最小幅・最大幅
  width = Math.max(400, Math.min(width, rect.width - 400));

  left.style.width = width + "px";
});

document.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

//プレビュー
document.getElementById("preview").textContent =
  "あああああああああああああああああああああああああああああああああああああああああああああ\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na";
