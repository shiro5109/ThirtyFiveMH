// @ts-check

import { Calendar35 } from "./js/logic/Calendar35.1.js";
import { Data } from "./js/logic/Data.js";
import { onCellTapped } from "./js/onCellTapped.js";
import { render } from "./js/render.js";
import {closeDialog} from "./js/closeDialog.js";

main();

function main() {
  const categories = ["食費", "日用品", "ガソリン"];
  let budget = [0, 0, 0];

  // @ts-ignore
  document.getElementById('recalculate').addEventListener('click', () => {
    alert("合計: " + budget.reduce((a, b) => a + b, 0));
  });

  // @ts-ignore
  document.getElementById('prev').addEventListener('click', () => { calendar35.month--; render(); });
  // @ts-ignore
  document.getElementById('next').addEventListener('click', () => { calendar35.month++; render(); });

  // iOS判定してメッセージを表示
  if (window.matchMedia("(display-mode: standalone)").matches === false) {
    // @ts-ignore
    document.getElementById('iosPrompt').style.display = 'block';
  }

  // @ts-ignore
  document.getElementById("saveBtn").addEventListener("click", () => {
      // @ts-ignore
      const amount = Number(document.getElementById("amountInput").value);
      // @ts-ignore
      const type = document.getElementById("typeSelect").value;

      if (!amount || amount <= 0) {
          alert("正しい金額を入力してください");
          return;
      }

      console.log(amount, type);
  });
  // @ts-ignore
  document.getElementById("cancelBtn").addEventListener("click", closeDialog);
  
  closeDialog();

  let data = new Data();
  let string = localStorage.getItem("data");
  if (string != null) {
    const data2 = JSON.parse(string);
    if (data2 == null) {
      alert("データの読み込みに失敗しました。");
      return;
    }

    data = Data.fromJSON(data2);
  }

  const today = new Date();
  const calendar35 = new Calendar35(today.getFullYear(), today.getMonth() + 1);

  render(data, calendar35, budget, document, categories, onCellTapped);
}