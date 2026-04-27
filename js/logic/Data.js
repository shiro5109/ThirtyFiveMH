// @ts-check

import { BudgetDialog } from "../summarize/budgetDialog.js";
import { SummaryVM } from "../summarize/SummaryVM.js";
import { Budget } from "./Budget.js";
import { Calendar35 } from "./Calendar35.1.js";
import { Payment } from "./Payment.1.js";
import { EditExpense } from "../editExpense/editExpense.js";

export class Data {
    /**
     * @param {Payment} payment
     */
    DeletePayment(payment) {
        const index = this.payments.indexOf(payment);
        if (index > -1) {
            this.payments.splice(index, 1);
        }
    }
    /**
     * @param {EditExpense} editExpense
     */
    DrawPaymentLows(editExpense) {
      this.payments.forEach(payment => editExpense.DrawPaymentRow(payment));
    }
    /**
     * @param {Calendar35} calendar35
     * @param {(() => void)} saveFunction
     * @param {(() => void)} refreshFunction
     * @param {BudgetDialog} budgetDialog
     */
    CreateSummaryVM(calendar35,saveFunction,refreshFunction,budgetDialog) {
        if(!this.budgets){
            this.budgets=[];
        }
        let budget=this.budgets.find(b=>b.month35.year===calendar35.year && b.month35.month===calendar35.month);
        if(!budget){
            budget=new Budget(calendar35,[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]);
            this.budgets.push(budget);
        }
        return new SummaryVM(
            calendar35, budget, this.payments,()=>saveFunction(),()=>refreshFunction(),budgetDialog);
    }
    /**
   * @param {string} data2
   */
    static fromJSON(data2) {
      const obj = typeof data2 === 'string' ? JSON.parse(data2) : data2;
      
      return new Data(
        (obj.payments || []).map(
            (
                /** @type {{ date: string | number | Date; amount: any; type: any; comment: any; }} */ 
                p) => ({
                     date: new Date(p.date), 
                     amount: p.amount, 
                     type: p?.type,
                     comment: p?.comment })
        ),
        (obj.budgets || []).map(
            (
                /** @type {{ month35: { year: number; month: number; }; weekBudgets: any; medicalBudgets: any; luxBudgets: any; }} */ 
                b) => new Budget(
                new Calendar35(b.month35.year, b.month35.month),
                b.weekBudgets || [0,0,0,0,0],
                b.medicalBudgets || [0,0,0,0,0],
                b.luxBudgets || [0,0,0,0,0]
            )
        )
      );
    }

    toJSON() {
      return {
        payments: this.payments.map(
            p => ({ date: p.date.toISOString(),
                 amount: p.amount, 
                 type: p?.type,
                 comment: p?.comment })),
        budgets:(this.budgets || []).map(b=>({month35:{year:b.month35.year,month:b.month35.month},weekBudgets:b.foodBudgets}))
      };
    }

    /**
   * @param {Payment[]} [payments]
   * @param {Budget[]} [budgets]
   */
    constructor(payments=[],budgets=[]) {
        this.payments = payments;
        this.budgets = budgets;
    }

    /**
     * @type {Payment[]}
     */
    payments = [];

    /**
   * @param {Date} date
   * @param {number} amount
   * @param {string} type
   * @param {string} comment
   */
    addPayment2(date, amount,type,comment) {
        this.payments.push({ date, amount, type ,comment});
    }

    /**
     * @param {Date} date
     * @return {number}
     */
    CalcTotalPaymentOf(date) {
        return this.payments
            .filter(p => p.date.toDateString() === date.toDateString())
            .reduce((sum, p) => sum + p.amount, 0);
    }
}
