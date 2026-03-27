//@ts-check

import { Calendar35 } from "./Calendar35.1.js";
import { ExpenseTypes } from "./ExpenseTypes.js";

export class Budget{
    /**
     * @param {number[]} foodBudgets
     * @param {Calendar35} month35
     * @param {number[]} medicalBudgets
     * @param {number[]} luxBudgets
     */
    constructor(month35,foodBudgets,medicalBudgets,luxBudgets) {
        this.month35=month35;
        this.foodBudgets=foodBudgets;
        this.medicalBudgets=medicalBudgets;
        this.luxBudgets=luxBudgets;
    }

    /**
     * @param {number} weekIndex
     * @param {string} expenseTypeString
     * @returns {number}
     */
    GetBudgetValue(weekIndex,expenseTypeString){
        // @ts-ignore
        switch(expenseTypeString){
            case ExpenseTypes.Food.value:
                return this.foodBudgets[weekIndex] || 0;
            case ExpenseTypes.Medical.value:
                return this.medicalBudgets ? this.medicalBudgets[weekIndex] || 0 : 0;
            case ExpenseTypes.Social.value:
                return this.luxBudgets ? this.luxBudgets[weekIndex] || 0 : 0;
            default:
                // @ts-ignore
                throw new Error("Unknown expense type: " + expenseTypeString);
        }
//        return this.foodBudgets[weekIndex] || 0;
    }
}