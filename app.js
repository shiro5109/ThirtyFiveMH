// @ts-check

const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

function renderTable() {
    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        const tr = document.createElement('tr');
        const tdCat = document.createElement('td');
        tdCat.textContent = cat;
        const tdVal = document.createElement('td');
        tdVal.textContent = budget[i];
        tdVal.contentEditable = true; // 編集可能
        tdVal.addEventListener('input', () => budget[i] = Number(tdVal.textContent));
        tr.appendChild(tdCat);
        tr.appendChild(tdVal);
        // @ts-ignore
        tbody.appendChild(tr);
    });
}

function calendarTable(){
    const tbody=document.getElementById('calendarBody');
    // @ts-ignore
    tbody.innerHTML="";
    for(let row=0;row<6;row++){
        const tr=document.createElement('tr');

        for(let col=0;col<7;col++){
            const td=document.createElement('td');
            td.textContent="aaa";
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

class Calendar35{
    /**
     * @param {number} year
     * @param {number} month
     */
    constructor(year, month){
        this.year=year;
        this.month=month;
    }
}

// @ts-ignore
document.getElementById('recalculate').addEventListener('click', () => {
    alert("合計: " + budget.reduce((a, b) => a + b, 0));
});

// @ts-ignore
document.getElementById('prev').addEventListener('click', () => {/* 前月処理 */ });
// @ts-ignore
document.getElementById('next').addEventListener('click', () => {/* 翌月処理 */ });

// iOS判定してメッセージを表示
//if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
  document.getElementById('iosPrompt').style.display = 'block';
//}

renderTable();
calendarTable();

const today=new Date();
const calendar35=new Calendar35(today.getFullYear(), today.getMonth() + 1);

// @ts-ignore
document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;