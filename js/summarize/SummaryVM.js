//@ts-check

import { BudgetDialog } from "./budgetDialog.js";
import { createNonEditableCell } from "./createNonEditableCell.js";
import { Budget } from "../logic/Budget.js";
import { Calendar35 } from "../logic/Calendar35.1.js";
import { dateDiffInDays } from "../logic/dateDiffInDays.1.js";
import { ExpenseTypes } from "../logic/ExpenseTypes.js";
import { Payment } from "../logic/Payment.1.js";

export class SummaryVM{
    /**
     * @param {number} weekIndex
     * @param {number} val
     * @param {string} budgetTypeString

     */
    SetBudgetValue(weekIndex, val,budgetTypeString) {
        switch(budgetTypeString) {
            case ExpenseTypes.Food.value:
                this.budget.foodBudgets[weekIndex]=val;
                break;
            case ExpenseTypes.Medical.value:
                this.budget.medicalBudgets[weekIndex]=val;
                break;
            case ExpenseTypes.Social.value :
                this.budget.luxBudgets[weekIndex]=val;
                break;
        }
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
     * @param {BudgetDialog} budgetDialog
     */
    constructor(month35,budget,payments,saveFunction,refreshFunction,budgetDialog) {
        this.month35=month35;
        this.budget=budget;
        this.payments=payments;
        this.SaveFunction=saveFunction;
        this.RefreshFunction=refreshFunction;
        this.budgetDialog=budgetDialog;
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

        return this.budget.foodBudgets[weekIndex]-used;
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
     * @param {HTMLElement | null} tbody
     */
    renderRemaining(tbody) {
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
            createNonEditableCell(tr2,this.GetRemaining(j));
            displayed+=this.GetRemaining(j);
        }
        createNonEditableCell(tr2,displayed);

        // @ts-ignore
        tbody.appendChild(tr2);
    }

    /**
     * @param {HTMLElement | null} tbody
     * @param {string[]} types
     */
    renderConsumation(tbody,types) {
        const tr2=document.createElement('tr');    
        const tdLabel = document.createElement('td');
        tdLabel.textContent = "　使用";
        tr2.appendChild(tdLabel);

        let displayed=0;
        for(let j=0;j<5;j++){
            // @ts-ignore
    //        let filteredPayments=thisMonth.FilterPayments(payments,j) ;
            let thisWeek=this.GetConsumed(j,types);
            createNonEditableCell(tr2,thisWeek);
            displayed+=thisWeek;
        }
        createNonEditableCell(tr2,displayed);

        // @ts-ignore
        tbody.appendChild(tr2);
    }

    /**
     * @param {HTMLElement | null} tbody
     * @param {string[]} types
     */
    renderBudget(tbody,types) {
        const tr2=document.createElement('tr');    
        const tdLabel = document.createElement('td');
        tdLabel.textContent = "　予算";
        tr2.appendChild(tdLabel);

        let displayed=0;
        for(let j=0;j<5;j++){
            console.log(this);
            console.log(this.budget);
            console.log(types);
            // @ts-ignore
            let weekBudget=this.budget.GetBudgetValue(j,types[0]);
            if(weekBudget==null) weekBudget=0;
            // @ts-ignore
            const tdVal=this.createEditableCell(j,weekBudget,types[0]);
            tr2.appendChild(tdVal);
            displayed+=this.budget.foodBudgets[j];
        }
        createNonEditableCell(tr2,displayed);

        // @ts-ignore
        tbody.appendChild(tr2);
    }

        /**
     * @param {number} weekIndex
     * @param {number} weekBudget
     * @param {string} budgetTypeString
     */
    createEditableCell(weekIndex,weekBudget,budgetTypeString){
        const tdVal = document.createElement('td');
        tdVal.classList.add('summaryTD');
        tdVal.classList.add('editableCell');

        tdVal.textContent = weekBudget.toString();

        tdVal.addEventListener('click', () =>this.OnClickEditableCell(weekIndex,budgetTypeString));

        return tdVal;
    }

    /**
     * @param {number} weekIndex
     * @param {string} budgetTypeString
     */
    OnClickEditableCell(weekIndex,budgetTypeString) {
        if(document==null) throw new Error("document is null");
        document.getElementById("budgetDialogOverlay")?.classList.remove("hidden");

        this.budgetDialog.OnDecide=(/** @type {number} */ value)=>
            this.OnDecideValue(value,weekIndex,budgetTypeString);
    }

    /**
     * @param {number} value
     * @param {number} weekIndex
     * @param {string} budgetTypeString
     */
    OnDecideValue(value, weekIndex,budgetTypeString){
        this.SetBudgetValue(weekIndex,value,budgetTypeString);
        this.Refresh();
        this.Save();
    };
}