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

/**
 * @param {any[]} dates
 */
function calendarTable(dates){
    const tbody=document.getElementById('calendarBody');
    // @ts-ignore
    tbody.innerHTML="";
    let cellCounter=0;
    for(let row=0;row<6;row++){
        const tr=document.createElement('tr');

        for(let col=0;col<7;col++){
            const td=document.createElement('td');
            if(dates[cellCounter]!=null){
                td.textContent=dates[cellCounter].getDate().toString();
                //TODO: 最初の日および1日には月表示を追加
            }else{
                td.textContent="";
            }
//            td.textContent="aaa";
            tr.appendChild(td);
            cellCounter++;
        }

        // @ts-ignore
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

    CalcFirstDay() {
        let firstDay31=1+35*(this.month-1);
        const date31=new Date(this.year,0,1);// 1/1
        date31.setDate(firstDay31);
        return date31;
    }
}

function dateDiffInDays(date1, date2){
    const _MS_PER_DAY=1000*60*60*24;
    const utc1=Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2=Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2-utc1)/_MS_PER_DAY);
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


const today=new Date();
const calendar35=new Calendar35(today.getFullYear(), today.getMonth() + 1);

let firstDay31=calendar35.CalcFirstDay();
console.log(`firstDay31: ${firstDay31}`);
let totalDays=dateDiffInDays(new Date(today.getFullYear(),0,1), firstDay31)+1;
console.log(`totalDays: ${totalDays}`);

const dates=[];
let blankCellNum=2;//temp
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
calendarTable(dates);

// @ts-ignore
document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;
//TODO: 正式には2月1日ならcalendar35.month=1となったほうが親切
