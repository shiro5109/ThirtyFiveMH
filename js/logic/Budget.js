//@ts-check

import { Calendar35 } from "./Calendar35.1.js";

export class Budget{
    /**
     * @param {number[]} weekBudgets
     * @param {Calendar35} month35
     */
    constructor(month35,weekBudgets){
        this.month35=month35;
        this.weekBudgets=weekBudgets;
    }

    /**
     * @param {number} weekIndex
     * @returns {number}
     */
    GetWeekIndex(weekIndex) {
        return this.weekBudgets[weekIndex] || 0;
    }
}