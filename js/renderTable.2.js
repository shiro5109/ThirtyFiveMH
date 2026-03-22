// @ts-check

import { Calendar35 } from "./logic/Calendar35.1.js";
import { Payment } from "./logic/Payment.1.js";
import { SummaryVM } from "./SummaryVM.js";
import { Budget } from "./logic/Budget.js";
import { ExpenseTypes } from "./logic/ExpenseTypes.js";


/**
 * @param {SummaryVM} summaryVM
 */
export function renderTable(summaryVM) {
    const categories = ["食費、日用品、ガソリン", "医療費", "交際費、外食"];

    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat) => {
        {
            const tr = document.createElement('tr');
            const tdCat = document.createElement('td');
            tdCat.innerHTML = "<b>" + cat + "</b>";
            tdCat.colSpan=7;
            tr.appendChild(tdCat);
            // @ts-ignore
            tbody.appendChild(tr);
        }

        //todo: refactor
        /**
         * @type {string[]}
         */
        let types=[]
        if(cat==="食費、日用品、ガソリン"){
            types=["food","daily","gas"];
        }else if(cat==="医療費"){
            types=["medical"];
        }else if(cat==="交際費、外食"){
            types=["social","dining"];
        }

        renderBudget(tbody,summaryVM);
        renderConsumation(summaryVM,tbody,types);
        renderRemaining(tbody,summaryVM);
    });
}

/**
 * @param {string[]} targetTypes
 */
function MyFilter(targetTypes){
    // @ts-ignore
    let result=[];
    targetTypes.forEach(t=>{
        result.push(ExpenseTypes.find(e=>e.value===t)?.label);
    });
    // @ts-ignore
    return result;
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

    let displayed=0;
    for(let j=0;j<5;j++){
        // @ts-ignore
        summaryVM.createEditableCell(tr2,summaryVM,j);
        displayed+=summaryVM.budget.weekBudgets[j];
    }
    createNonEditableCell(tr2,displayed);

    // @ts-ignore
    tbody.appendChild(tr2);
}

/**
 * @param {SummaryVM} summaryVM
 * @param {HTMLElement | null} tbody
 * @param {string[]} types
 */
function renderConsumation(summaryVM,tbody,types) {
    const tr2=document.createElement('tr');    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = "　使用";
    tr2.appendChild(tdLabel);

    let displayed=0;
    for(let j=0;j<5;j++){
        // @ts-ignore
//        let filteredPayments=thisMonth.FilterPayments(payments,j) ;
        let thisWeek=summaryVM.GetConsumed(j,types);
        createNonEditableCell(tr2,thisWeek);
        displayed+=thisWeek;
    }
    createNonEditableCell(tr2,displayed);

    // @ts-ignore
    tbody.appendChild(tr2);
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
    const tdVal = document.createElement('td');
    tdVal.classList.add('summaryTD');
    tdVal.textContent = value.toString();
    tr2.appendChild(tdVal);
}
