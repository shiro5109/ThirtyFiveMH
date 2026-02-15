// @ts-check

import { Calendar35 } from "./js/logic/Calendar35.1.js";
import { Data } from "./js/logic/Data.js";
import { onCellTapped } from "./js/onCellTapped.js";
import { render } from "./js/render.js";
import {closeDialog} from "./js/closeDialog.js";
import { populateExpenseTypes } from "./js/populateExpenseTypes.js";
import { DialogOverLay } from "./js/DialogOverLay.js";

main();

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    populateExpenseTypes();
  });

  // @ts-ignore
  // document.getElementById('recalculate').addEventListener('click', () => {
  //   alert("合計: " + budget.reduce((a, b) => a + b, 0));
  // });

  // iOS判定してメッセージを表示
  if (window.matchMedia("(display-mode: standalone)").matches === false) {
    // @ts-ignore
    document.getElementById('iosPrompt').style.display = 'block';
  }

  let dialog=new DialogOverLay();
  dialog.InitializeSaveButton();

  // @ts-ignore
  document.getElementById("cancelBtn").addEventListener("click", closeDialog);
  
//  closeDialog();

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

  // @ts-ignore
  document.getElementById('prev').addEventListener('click', () => {
     calendar35.month--; render(data, calendar35, onCellTapped); });
  // @ts-ignore
  document.getElementById('next').addEventListener('click', () => { 
    calendar35.month++; render(data, calendar35, onCellTapped); });

  render(data, calendar35, onCellTapped);
}