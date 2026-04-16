// @ts-check

import {ExpenseTypes} from "../logic/ExpenseTypes.js";

export function populateExpenseTypes() {
    const select = document.getElementById("typeSelect");
    if(!select) throw new Error("typeSelect not found");
    select.innerHTML = "";

    for (const type of Object.values(ExpenseTypes)) {
        const option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.label;
        select.appendChild(option);
    }
}
