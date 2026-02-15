import {ExpenseTypes} from "./logic/ExpenseTypes.js";

export function populateExpenseTypes() {
    const select = document.getElementById("typeSelect");
    select.innerHTML = "";

    for (const type of ExpenseTypes) {
        const option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.label;
        select.appendChild(option);
    }
}
