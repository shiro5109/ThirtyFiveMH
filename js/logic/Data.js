// @ts-check

import { SummaryVM } from "../SummaryVM.js";
import { Budget } from "./Budget.js";
import { Calendar35 } from "./Calendar35.1.js";
import { Payment } from "./Payment.1.js";

export class Data {
    /**
     * @param {Calendar35} calendar35
     * @param {(() => void)} saveFunction
     * @param {(() => void)} refreshFunction
     */
    CreateSummaryVM(calendar35,saveFunction,refreshFunction) {
        // @ts-ignore
//        this.budgets=[];//TODO
        if(!this.budgets){
            // @ts-ignore
            this.budgets=[];
        }
        let budget=this.budgets.find(b=>b.month35.year===calendar35.year && b.month35.month===calendar35.month);
        if(!budget){
            budget=new Budget(calendar35,[0,0,0,0,0]);
            // @ts-ignore
            this.budgets.push(budget);
        }
        return new SummaryVM(
            calendar35, budget, this.payments,()=>saveFunction(),()=>refreshFunction());
    }
    /**
   * @param {string} data2
   */
    static fromJSON(data2) {
      const obj = typeof data2 === 'string' ? JSON.parse(data2) : data2;
      
      // @ts-ignore
      return new Data(
        // @ts-ignore
        (obj.payments || []).map(p => ({ date: new Date(p.date), amount: p.amount })),
        // @ts-ignore
        (obj.budgets || []).map(b => ({ month35: new Calendar35(b.month35.year, b.month35.month), weekBudgets: b.weekBudgets }))
      );
    }

    toJSON() {
      return {
        payments: this.payments.map(p => ({ date: p.date.toISOString(), amount: p.amount })),
        budgets:(this.budgets || []).map(b=>({month35:{year:b.month35.year,month:b.month35.month},weekBudgets:b.weekBudgets}))
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
     * @param {Payment} payment
     */
    addPayment(payment) {
        this.payments.push(payment);
    }

    /**
   * @param {Date} date
   * @param {number} amount
   * @param {string} type
   */
    addPayment2(date, amount,type) {
        this.payments.push({ date, amount, type });
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
