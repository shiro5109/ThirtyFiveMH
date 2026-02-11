// @ts-check

import { Calendar35 } from "./Calendar35.1.js";
import { calendarTable } from "./calendarTable.1.js";
import { Data } from "./Data.js";
import { dateDiffInDays } from "./dateDiffInDays.1.js";
import { Payment } from "./Payment.1.js";

const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

export const data = new Data();

function renderTable() {
    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        const tr = document.createElement('tr');
        const tdCat = document.createElement('td');
        tdCat.textContent = cat;
        const tdVal = document.createElement('td');
        tdVal.textContent = budget[i].toString();
        tdVal.contentEditable = 'true'; // 編集可能
        tdVal.addEventListener('input', () => budget[i] = Number(tdVal.textContent));
        tr.appendChild(tdCat);
        tr.appendChild(tdVal);
        // @ts-ignore
        tbody.appendChild(tr);
    });
}

/**
 * @param {Date} date
 */
function onCellTapped(date) {
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
//if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
if(window.matchMedia("(display-mode: standalone)").matches===false){
  // @ts-ignore
  document.getElementById('iosPrompt').style.display = 'block';
}
//}

render();

function render(){
    let firstDay31=calendar35.CalcFirstDate();
    console.log(`firstDay31: ${firstDay31}`);
    let totalDays=dateDiffInDays(new Date(today.getFullYear(),0,1), firstDay31)+1;
    console.log(`totalDays: ${totalDays}`);

    const dates=[];

    const firstDayWeekday=firstDay31.getDay();
    const blankCellNum=(firstDayWeekday+6)%7;//月曜始まりに変換
    for(let i=0;i<blankCellNum;i++){
        dates.push(null);
    }
    for(let i=1;i<=35;i++){
        let date=new Date(today.getFullYear(),0,1);
        date.setDate(totalDays+i-1);
        dates.push(date);
    }
    for(let i=dates.length;i<42;i++){
        dates.push(null);
    }

    renderTable();
    calendarTable(dates,onCellTapped,document,data);

    // @ts-ignore
    document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;
    //TODO: 正式には2月1日ならcalendar35.month=1となったほうが親切
}

