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
        let used=this.GetConsumed(weekIndex,[]);//TODO
        // let start=this.month35.CalcFirstDate();
        
        // this.payments.forEach(
        //     p=>{
        //         let diff=dateDiffInDays(start,p.date);
        //         if(diff>=weekIndex*7 && diff<(weekIndex+1)*7){
        //             used+=p.amount;
        //         }
        // });

        return this.budget.weekBudgets[weekIndex]-used;
    }

    /**
     * @param {number} weekIndex
     * @param {any[]} types
     */
    GetConsumed(weekIndex,types){
        let used=0;
        let start=this.month35.CalcFirstDate();

        this.payments.forEach(
            p=>{
                if(types.length>0 && !types.includes(p.type)) return;
                let diff=dateDiffInDays(start,p.date);
                if(diff>=weekIndex*7 && diff<(weekIndex+1)*7){
                    used+=p.amount;
                }
        });
        return used;
    }

    /**
     * @param {HTMLTableRowElement} tr2
     * @param {SummaryVM} summaryVM
     * @param {number} weekIndex
     */
    createEditableCell(tr2,summaryVM,weekIndex) {
    //    let total = 0;
    //  filteredPayments.forEach(p => total += p.amount);
        const tdVal = document.createElement('td');
        tdVal.classList.add('summaryTD');
        tdVal.classList.add('editableCell');
        tdVal.textContent = summaryVM.budget.weekBudgets[weekIndex].toString();
        tdVal.contentEditable = 'true'; // 編集可能
        tdVal.addEventListener('input', () =>{
            let val=Number(tdVal.textContent);
            summaryVM.SetBudgetValue(weekIndex,val);
            summaryVM.Refresh();
            summaryVM.Save();
        } );
        tr2.appendChild(tdVal);
    }
}