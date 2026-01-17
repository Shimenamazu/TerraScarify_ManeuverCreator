//値
const add_eff_button = document.getElementById("add-eff-button"); //エフェクト追加ボタン
const add_eff_button_text = document.getElementById("add-eff-button-text"); //エフェクト追加ボタンのテキスト
const add_eff_panel = document.getElementById("add-eff-panel"); //エフェクト追加パネル
const eff_list_box = document.getElementById("eff-list-box"); //エフェクト一覧ボックス
const build_eff_editer = document.getElementById("build-eff-editer"); //追加パネル全体

//クラス
class Effect {
  constructor(name, group) {
    this.name = name;
    this.group = group;
  }

  open_sp_panel() {}
}

class SetNameEffect extends Effect {
  constructor(name, group) {
    super(name, group);
  }

  open_sp_panel() {
    document.getElementById("build-eff-panel-name").classList.remove("hidden");
  }
}

class EnchantEffect extends Effect {
  constructor(name, group) {
    super(name, group);
  }

  open_sp_panel() {
    document
      .getElementById("build-eff-panel-enchant")
      .classList.remove("hidden");
  }
}

//エフェクトリスト
let eff_list = {
  check_inc: new SetNameEffect("判定値増加", "判定"),
  check_dec: new SetNameEffect("判定値減少", "判定"),
  stat_inc: new SetNameEffect("能力値増加", "ステータス"),
  stat_dec: new SetNameEffect("能力値減少", "ステータス"),
  mov_inc: new Effect("移動力増加", "ステータス"),
};

//ボタン作成
let label_text = "";

for (const key in eff_list) {
  //ラベルの更新
  if (label_text != eff_list[key].group) {
    label_text = eff_list[key].group;
    const label = document.createElement("div");
    label.classList.add("eff-list-el");
    label.textContent = "【" + label_text + "】";
    eff_list_box.appendChild(label);
  }
  //ボタンの作成
  const btn = document.createElement("button");
  btn.classList.add("eff-list-el");
  btn.classList.add("eff-el-button");
  btn.dataset.setid = key;
  btn.textContent = eff_list[key].name;
  eff_list_box.appendChild(btn);
}

//エフェクト追加ボタン
add_eff_button.addEventListener("click", () => {
  const isHidden = add_eff_panel.classList.toggle("hidden");

  if (isHidden) {
    //非表示にするとき
    add_eff_button.textContent = "+";
    add_eff_button_text.textContent = "エフェクト追加";
  } else {
    //表示するとき
    add_eff_button.textContent = "-";
    add_eff_button_text.textContent = "キャンセル";
    build_eff_editer.classList.add("hidden");
    eff_list_box.classList.remove("hidden");
    document.querySelectorAll(".build-eff-panel").forEach((panel) => {
      panel.classList.add("hidden");
    });
    eff_list_box.scrollTop = 0;
  }
});

//各種エフェクトボタン(リスト上)
eff_list_box.addEventListener("click", (e) => {
  const btn = e.target.closest(".eff-el-button");
  //ボタンのみ指定
  if (!btn) return;

  //
  const btn_id = btn.dataset.setid;

  build_eff_editer.classList.remove("hidden");
  eff_list[btn_id].open_sp_panel();
  document.getElementById("build-eff-name").textContent = eff_list[btn_id].name;
  eff_list_box.classList.add("hidden");
});

//再選択ボタン
document.getElementById("build-eff-rechoice").addEventListener("click", () => {
  //
  build_eff_editer.classList.add("hidden");
  eff_list_box.classList.remove("hidden");
  document.querySelectorAll(".build-eff-panel").forEach((panel) => {
    panel.classList.add("hidden");
  });
});
