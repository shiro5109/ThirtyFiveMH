// @ts-check

import { Calendar35 } from "./Calendar35.1.js";
import { Data } from "./Data.js";
import { Payment } from "./Payment.1.js";
import { render } from "./render.js";

export const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

export const data = new Data();

/**
 * @param {Date} date
 */
export function onCellTapped(date) {
    const input = prompt(
        `金額を入力してください`
    );

    if (input === null) {
        // キャンセル
        return;
    }

    const amount = Number(input);

    if (isNaN(amount)) {
        alert("数値を入力してください");
        return;
    }

    console.log("入力された金額:", amount);
    const payment = new Payment(amount,date);
    data.addPayment(payment);
    render();
}

// @ts-ignore
document.getElementById('recalculate').addEventListener('click', () => {
    alert("合計: " + budget.reduce((a, b) => a + b, 0));
});

const today=new Date();
const calendar35=new Calendar35(today.getFullYear(), today.getMonth() + 1);

// @ts-ignore
document.getElementById('prev').addEventListener('click', () => {calendar35.month--; render();});
// @ts-ignore
document.getElementById('next').addEventListener('click', () => {calendar35.month++; render();});

// iOS判定してメッセージを表示
if(window.matchMedia("(display-mode: standalone)").matches===false){
  // @ts-ignore
  document.getElementById('iosPrompt').style.display = 'block';
}

render(data,today,calendar35,budget,document,categories,onCellTapped);


