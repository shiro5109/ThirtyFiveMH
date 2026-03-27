// @ts-check

import { Calendar35 } from "./js/logic/Calendar35.1.js";
import { Data } from "./js/logic/Data.js";
import { render } from "./js/render.js";
import {closeDialog} from "./js/closeDialog.js";
import { populateExpenseTypes } from "./js/populateExpenseTypes.js";
import { DialogOverLay } from "./js/DialogOverLay.js";
import { BudgetDialog } from "./js/budgetDialog.js";

main();

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    populateExpenseTypes();
  });

  // iOS判定してメッセージを表示
  if (window.matchMedia("(display-mode: standalone)").matches === false) {
    // @ts-ignore
    document.getElementById('iosPrompt').style.display = 'block';
  }

  // @ts-ignore
  document.getElementById("paymentDetailButton").addEventListener("click", (e) => {
    e.preventDefault();
    alert("この機能はまだ使えません。");
  });

  // @ts-ignore
  document.getElementById("fixedCostButton").addEventListener("click", (e) => {
    e.preventDefault();
    alert("この機能はまだ使えません。");
  });

  // @ts-ignore
  document.getElementById("cancelBtn").addEventListener("click", closeDialog);

  // @ts-ignore
  document.getElementById("updateButton").addEventListener("click", updateApp);

  //note: before setting next/prev
  const today = new Date();
  const calendar35 = new Calendar35(today.getFullYear(), today.getMonth() + 1);

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

  let dialog=new DialogOverLay(data);
  dialog.InitializeSaveButton(refresh);
  const budgetDialog=new BudgetDialog();
  
  // @ts-ignore
  document.getElementById('prev').addEventListener('click', () => {
     calendar35.DecreaseMonth(); refresh(); });
  // @ts-ignore
  document.getElementById('next').addEventListener('click', () => { 
    calendar35.IncreaseMonth(); refresh(); });

  refresh();

  function refresh(){
    render(
      data, 
      calendar35,
      dialog,()=>{save();},
      ()=>refresh(),
      budgetDialog);
  }

  function save(){
    localStorage.setItem("data", JSON.stringify(data));
  }
}

function updateApp() {
  navigator.serviceWorker.getRegistration().then(reg => {
    if (!reg) return;

    // 新しいSWを取得
    reg.update().then(() => {

      if (reg.waiting) {
        // 待機中SWを即反映
        reg.waiting.postMessage('SKIP_WAITING');
      }

      // 少し待ってリロード
      setTimeout(() => {
        window.location.reload();
      }, 500);

    });
  });
}