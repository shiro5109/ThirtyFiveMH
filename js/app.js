// @ts-check

import { Calendar35 } from "./Calendar35.1.js";
import { Data } from "./Data.js";
import { onCellTapped } from "./onCellTapped.js";
import { render } from "./render.js";


export const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

// @ts-ignore
document.getElementById('recalculate').addEventListener('click', () => {
    alert("合計: " + budget.reduce((a, b) => a + b, 0));
});

// @ts-ignore
document.getElementById('prev').addEventListener('click', () => {calendar35.month--; render();});
// @ts-ignore
document.getElementById('next').addEventListener('click', () => {calendar35.month++; render();});

// iOS判定してメッセージを表示
if(window.matchMedia("(display-mode: standalone)").matches===false){
  // @ts-ignore
  document.getElementById('iosPrompt').style.display = 'block';
}

const data = new Data();
const today=new Date();
const calendar35=new Calendar35(today.getFullYear(), today.getMonth() + 1);
render(data,today,calendar35,budget,document,categories,onCellTapped);
