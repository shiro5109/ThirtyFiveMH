// @ts-check

class Payment{
    /**
     * @param {number} amount
     * @param {Date} date
     */
    constructor(amount, date){
        this.amount = amount;
        this.date = date;
    }
}

class Data{
    /**
     * @type {Payment[]}
     */
    payments=[];

    /**
     * @param {Payment} payment
     */
    addPayment(payment){
        this.payments.push(payment);
    }

    /**
     * @param {Date} date
     * @return {number}
     */
    CalcTotalPaymentOf(date){
        return this.payments
            .filter(p => p.date.toDateString() === date.toDateString())
            .reduce((sum, p) => sum + p.amount, 0);
    }
}

const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

const data = new Data();

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

/**
 * @param {(Date | null)[]} dates
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
                const date=dates[cellCounter];
                // @ts-ignore
                td.innerHTML=date.getDate().toString();
                //TODO: 最初の日および1日には月表示を追加
                // @ts-ignore
                const totalPayment= data.CalcTotalPaymentOf(date);
                if(totalPayment>0){
                    td.innerHTML+="<br>"+totalPayment+"円";
                }
                td.addEventListener('click', () => {
                    // @ts-ignore
                    onCellTapped(date);
                });
            }else{
                td.innerHTML="";
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

    CalcFirstDate() {
        let firstDay31=1+35*(this.month-1);
        const date31=new Date(this.year,0,1);// 1/1
        date31.setDate(firstDay31);
        return date31;
    }
}

/**
 * @param {Date} date1
 * @param {Date} date2
 */
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

const today=new Date();
const calendar35=new Calendar35(today.getFullYear(), today.getMonth() + 1);

// @ts-ignore
document.getElementById('prev').addEventListener('click', () => {calendar35.month--; render();});
// @ts-ignore
document.getElementById('next').addEventListener('click', () => {calendar35.month++; render();});

// iOS判定してメッセージを表示
//if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
  document.getElementById('iosPrompt').style.display = 'block';
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
    calendarTable(dates);

    // @ts-ignore
    document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;
    //TODO: 正式には2月1日ならcalendar35.month=1となったほうが親切
}

