// @ts-check

import { Calendar35 } from "./logic/Calendar35.1.js";
import { Payment } from "./logic/Payment.1.js";
import { SummaryVM } from "./SummaryVM.js";
import { Budget } from "./logic/Budget.js";
import { ExpenseTypes } from "./logic/ExpenseTypes.js";
import { createNonEditableCell } from "./createNonEditableCell.js";


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

        summaryVM.renderBudget(tbody,types);
        summaryVM.renderConsumation(tbody,types);
        summaryVM.renderRemaining(tbody);
    });
}









