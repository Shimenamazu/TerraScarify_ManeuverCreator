/********************************
  変数の指定
 ********************************/

//htmlタブ
const add_eff_button = document.getElementById("add-eff-button"); //エフェクト追加ボタン
const add_eff_button_text = document.getElementById("add-eff-button-text"); //エフェクト追加ボタンのテキスト
const add_eff_panel = document.getElementById("add-eff-panel"); //エフェクト追加パネル
const eff_list_box = document.getElementById("eff-list-box"); //エフェクト一覧ボックス
const build_eff_editer = document.getElementById("build-eff-editer"); //追加パネル全体
const target_select = document.getElementById("target-select"); //対象選択プルダウン
const power_select = document.getElementById("power-select"); //効果選択プルダウン

//変数
let unit_target = "ユニット1体"; //ユニット対象の数

//クラス
class Effect {
  constructor({
    name,
    group,
    eff_text,
    target,
    power_ini,
    power_step,
    power_lvl,
    power_coef,
  }) {
    Object.assign(this, {
      name,
      group,
      eff_text,
      target,
      power_ini,
      power_step,
      power_lvl,
      power_coef,
    });
  }

  //特殊パネル
  open_sp_panel() {}

  //エフェクト効果の選択
  set_effect() {
    //テキスト(前)
    document.getElementById("eff-textbox-top").textContent = this.eff_text[0];
    document.getElementById("eff-textbox-end").textContent = this.eff_text[1];

    //対象選択
    if (!this.target) {
      target_select.classList.add("hidden");
    } else {
      this.target.forEach((el) => {
        const option = document.createElement("option");
        if (el == "UNIT") {
          option.textContent = unit_target;
        } else {
          option.textContent = el;
        }
        target_select.appendChild(option);
      });
    }

    //
    if (!this.power_ini) {
      power_select.classList.add("hidden");
    } else {
      for (let i = 0; i <= this.power_lvl; i++) {
        const option = document.createElement("option");
        option.textContent =
          Number(this.power_ini) + Number(this.power_step) * i;
        option.value = i;
        power_select.appendChild(option);
      }
    }
  }
}

class SetNameEffect extends Effect {
  constructor({ name, group, eff_text, target }) {
    super({ name, group, eff_text, target });
  }

  open_sp_panel() {
    document.getElementById("build-eff-panel-name").classList.remove("hidden");
  }
}

class EnchantEffect extends Effect {
  constructor({ name, group, eff_text, target }) {
    super({ name, group, eff_text, target });
  }

  open_sp_panel() {
    document
      .getElementById("build-eff-panel-enchant")
      .classList.remove("hidden");
  }
}

/********************************
  ページを開いた時のセットアップ
 ********************************/
//変数
let label_text = ""; //一覧のラベル

//エフェクトリスト
const eff_list = {
  mov_inc: new Effect({
    name: "移動力増加",
    group: "ステータス",
    eff_text: ["の移動力が", "増加する。"],
    target: ["自身", "UNIT"],
    power_ini: 1,
    power_step: 1,
    power_lvl: 2,
    power_coef: 2,
  }),
};

//ボタン作成
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

/********************************
  各ボタンクリック時の挙動
 ********************************/
//エフェクト選択リストの表示
function show_eff_list() {
  build_eff_editer.classList.add("hidden"); //エディタを非表示
  eff_list_box.classList.remove("hidden"); //リストを表示
  document.querySelectorAll(".build-eff-panel").forEach((panel) => {
    panel.classList.add("hidden");
  }); //特殊パネルを非表示
  document.querySelectorAll(".build-eff-content").forEach((panel) => {
    panel.classList.remove("hidden");
  }); //説明文章を非表示
  target_select.options.length = 0;
  power_select.options.length = 0;
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
    eff_list_box.scrollTop = 0;
    show_eff_list();
  }
});

//各種エフェクトボタン(リスト上)
eff_list_box.addEventListener("click", (e) => {
  const btn = e.target.closest(".eff-el-button");
  //ボタンのみ指定
  if (!btn) return;

  //エフェクトのidの取得
  const btn_id = btn.dataset.setid;

  build_eff_editer.classList.remove("hidden"); //エディタの表示
  eff_list[btn_id].open_sp_panel(); //命名・付与のパネル表示
  document.getElementById("build-eff-name").textContent = eff_list[btn_id].name; //エフェクト名の表示
  eff_list[btn_id].set_effect(); //エフェクト内容の表示

  eff_list_box.classList.add("hidden"); //エフェクトリストの非表示
});

//再選択ボタン
document.getElementById("build-eff-rechoice").addEventListener("click", () => {
  //
  show_eff_list();
});
