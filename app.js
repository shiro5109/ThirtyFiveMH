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
    if (!reg) {
      console.log("SWなし");
      return;
    }

    reg.update().then(() => {
      console.log("update()実行");

      // すでにwaitingがある場合
      if (reg.waiting) {
        console.log("waitingあり");
        reg.waiting.postMessage('SKIP_WAITING');
        reloadAfterControllerChange();
        return;
      }

      // installing中を監視
      if (reg.installing) {
        console.log("installing監視");

        reg.installing.addEventListener('statechange', () => {
          // @ts-ignore
          if (reg.installing.state === 'installed') {
            console.log("installedになった");

            if (reg.waiting) {
              reg.waiting.postMessage('SKIP_WAITING');
            }
          }
        });
      }

      reloadAfterControllerChange();
    });
  });
}

function reloadAfterControllerChange() {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log("controller変更 → reload");
    window.location.reload();
  });
}