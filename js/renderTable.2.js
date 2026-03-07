// @ts-check

import { Calendar35 } from "./logic/Calendar35.1.js";
import { Payment } from "./logic/Payment.1.js";
import { SummaryVM } from "./SummaryVM.js";


/**
 * @param {number[]} budget2
 * @param {any[]} categories
 * @param {Payment[]} payments
 * @param {Calendar35} thisMonth
 * @param {SummaryVM} summaryVM
 */
export function renderTable(budget2,categories,payments,thisMonth,summaryVM) {
    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        {
            const tr = document.createElement('tr');
            const tdCat = document.createElement('td');
            tdCat.innerHTML = "<b>" + cat + "</b>";
            tr.appendChild(tdCat);
            // @ts-ignore
            tbody.appendChild(tr);
        }

        renderBudget(tbody,summaryVM);
        renderConsumation(thisMonth,summaryVM,tbody);
        renderRemaining(tbody,summaryVM);
    });
}

/**
 * @param {HTMLElement | null} tbody
 * @param {SummaryVM} summaryVM
 */
function renderBudget(tbody,summaryVM) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　予算";
    tr2.appendChild(tdLabel);

    for(let j=0;j<5;j++){
        // @ts-ignore
        let filteredPayments=[] ;//TODO
        // @ts-ignore
        createEditableCell(tr2,summaryVM,j);
    }

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {Calendar35} thisMonth
 * @param {SummaryVM} summaryVM
 * @param {HTMLElement | null} tbody
 */
function renderConsumation(thisMonth, summaryVM,tbody) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　使用";
    tr2.appendChild(tdLabel);

    let displayed=0;
    for(let j=0;j<5;j++){
        // @ts-ignore
//        let filteredPayments=thisMonth.FilterPayments(payments,j) ;
        let thisWeek=summaryVM.GetConsumed(j);
        createNonEditableCell(tr2,thisWeek);
        displayed+=thisWeek;
    }
    createNonEditableCell(tr2,displayed);

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {HTMLTableRowElement} tr2
 * @param {SummaryVM} summaryVM
 * @param {number} weekIndex
 */
function createEditableCell(tr2,summaryVM,weekIndex) {
//    let total = 0;
  //  filteredPayments.forEach(p => total += p.amount);
    const tdVal = document.createElement('td');
    tdVal.textContent = summaryVM.budget.GetWeekIndex(weekIndex).toString();
    tdVal.contentEditable = 'true'; // 編集可能
    tdVal.addEventListener('input', () =>{
        let val=Number(tdVal.textContent);
        summaryVM.SetBudgetValue(weekIndex,val);
        summaryVM.Refresh();
        summaryVM.Save();
    } );
    tr2.appendChild(tdVal);
}

/**
 * @param {HTMLElement | null} tbody
 * @param {SummaryVM} summaryVM
 */
function renderRemaining(tbody,summaryVM) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　残り";
    tr2.appendChild(tdLabel);

    var displayed=0;
    for(let j=0;j<5;j++){
        // @ts-ignore
        let filteredPayments=[];//TODO
//            p.date.getFullYear() === thisMonth.year && p.date.getMonth() === thisMonth.month - 1 && Math.floor((p.date.getDate() - 1) / 7) === j);
        // @ts-ignore
        createNonEditableCell(tr2,summaryVM.GetRemaining(j));
        displayed+=summaryVM.GetRemaining(j);
    }
    createNonEditableCell(tr2,displayed);

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {HTMLTableRowElement} tr2
 * @param {number} value
 */
function createNonEditableCell(tr2,value) {
//    let total = 0;
  //  filteredPayments.forEach(p => total += p.amount);
    const tdVal = document.createElement('td');
    tdVal.textContent = value.toString();
//    tdVal.contentEditable = 'true'; // 編集可能
//    tdVal.addEventListener('input', () => budget2[i] = Number(tdVal.textContent));
    tr2.appendChild(tdVal);
}
