//@ts-check

import { Budget } from "./logic/Budget.js";
import { Calendar35 } from "./logic/Calendar35.1.js";
import { dateDiffInDays } from "./logic/dateDiffInDays.1.js";
import { Payment } from "./logic/Payment.1.js";

export class SummaryVM{
    /**
     * @param {number} weekIndex
     * @param {number} val
     */
    SetBudgetValue(weekIndex, val) {
        this.budget.weekBudgets[weekIndex]=val;
    }
    Refresh() {
        // @ts-ignore
        this.RefreshFunction();
    }
    Save() {
        // @ts-ignore
        this.SaveFunction();
    }
    /**
     * @param {Calendar35} month35
     * @param {Budget} budget
     * @param {Payment[]} payments
     * @param {()=>void} saveFunction
     * @param {()=>void} refreshFunction
     */
    constructor(month35,budget,payments,saveFunction,refreshFunction){
        this.month35=month35;
        this.budget=budget;
        this.payments=payments;
        this.SaveFunction=saveFunction;
        this.RefreshFunction=refreshFunction;
    }
    /**
     * @param {number} weekIndex
     */
    GetRemaining(weekIndex){
        let used=this.GetConsumed(weekIndex);
        // let start=this.month35.CalcFirstDate();
        
        // this.payments.forEach(
        //     p=>{
        //         let diff=dateDiffInDays(start,p.date);
        //         if(diff>=weekIndex*7 && diff<(weekIndex+1)*7){
        //             used+=p.amount;
        //         }
        // });

        return this.budget.GetWeekIndex(weekIndex)-used;
    }

    /**
     * @param {number} weekIndex
     */
    GetConsumed(weekIndex){
        let used=0;
        let start=this.month35.CalcFirstDate();

        this.payments.forEach(
            p=>{
                let diff=dateDiffInDays(start,p.date);
                if(diff>=weekIndex*7 && diff<(weekIndex+1)*7){
                    used+=p.amount;
                }
        });
        return used;
    }
}