let eff_list = [
  ["5以下", [1, 2, 3, 4, 5]],
  ["6以上", [6, 7, 8, 9, 10]],
];

//値
const add_eff_button = document.getElementById("add-eff-button"); //エフェクト追加ボタン
const add_eff_button_text = document.getElementById("add-eff-button-text"); //エフェクト追加ボタンのテキスト
const add_eff_panel = document.getElementById("add-eff-panel"); //エフェクト追加パネル
const eff_list_box = document.getElementById("eff-list-box"); //エフェクト一覧ボックス

//起動時自

//
add_eff_button.addEventListener("click", () => {
  const isHidden = add_eff_panel.classList.toggle("hidden");

  if (isHidden) {
    //非表示にするとき
    eff_list_box.querySelectorAll(".eff-list-el").forEach((el) => {
      el.remove();
    });
    add_eff_button.textContent = "+";
    add_eff_button_text.textContent = "エフェクト追加";
  } else {
    //表示するとき
    eff_list.forEach((el) => {
      //ラベルの表示
      const label = document.createElement("div");
      label.className = "eff-list-el";
      const label_text = "【" + el[0] + "】";
      label.textContent = label_text;
      eff_list_box.appendChild(label);

      //ボタン
      el[1].forEach((value) => {
        const btn = document.createElement("button");
        btn.className = "eff-list-el";
        btn.textContent = value;
        eff_list_box.appendChild(btn);
      });
    });
    add_eff_button.textContent = "-";
    add_eff_button_text.textContent = "キャンセル";
    eff_list_box.scrollTop = 0;
  }
});
