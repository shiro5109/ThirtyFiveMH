// @ts-check

import { Calendar35 } from "./logic/Calendar35.1.js";
import { Payment } from "./logic/Payment.1.js";


/**
 * @param {number[]} budget2
 * @param {any[]} categories
 * @param {Payment[]} payments
 * @param {Calendar35} thisMonth
 */
export function renderTable(budget2,categories,payments,thisMonth) {
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

        renderBudget(tbody);
        renderConsumation(thisMonth,payments,tbody);
        renderRemaining(tbody);
    });
}

/**
 * @param {HTMLElement | null} tbody
 */
function renderBudget(tbody) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　予算";
    tr2.appendChild(tdLabel);

    for(let j=0;j<5;j++){
        // @ts-ignore
        let filteredPayments=[] ;//TODO
        // @ts-ignore
        createEditableCell(tr2,filteredPayments);
    }

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {Calendar35} thisMonth
 * @param {Payment[]} payments
 * @param {HTMLElement | null} tbody
 */
function renderConsumation(thisMonth, payments,tbody) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　使用";
    tr2.appendChild(tdLabel);

    const displayed=[];
    for(let j=0;j<5;j++){
        // @ts-ignore
        let filteredPayments=thisMonth.FilterPayments(payments,j) ;
        createEditableCell(tr2,filteredPayments);
        displayed.push(...filteredPayments);
    }
    createEditableCell(tr2,displayed);

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {HTMLTableRowElement} tr2
 * @param {Payment[]} filteredPayments
 */
function createEditableCell(tr2,filteredPayments) {
    let total = 0;
    filteredPayments.forEach(p => total += p.amount);
    const tdVal = document.createElement('td');
    tdVal.textContent = total.toString();
//    tdVal.contentEditable = 'true'; // 編集可能
//    tdVal.addEventListener('input', () => budget2[i] = Number(tdVal.textContent));
    tr2.appendChild(tdVal);
}

/**
 * @param {HTMLElement | null} tbody
 */
function renderRemaining(tbody) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　残り";
    tr2.appendChild(tdLabel);

    for(let j=0;j<5;j++){
        // @ts-ignore
        let filteredPayments=[];//TODO
//            p.date.getFullYear() === thisMonth.year && p.date.getMonth() === thisMonth.month - 1 && Math.floor((p.date.getDate() - 1) / 7) === j);
        // @ts-ignore
        createEditableCell(tr2,filteredPayments);
    }

    // @ts-ignore
    tbody.appendChild(tr2);
}