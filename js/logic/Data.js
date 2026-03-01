// @ts-check

import { Payment } from "./Payment.1.js";

export class Data {
    /**
   * @param {string} data2
   */
    static fromJSON(data2) {
      const obj = typeof data2 === 'string' ? JSON.parse(data2) : data2;
      // @ts-ignore
      return new Data((obj.payments || []).map(p => ({ date: new Date(p.date), amount: p.amount })));
    }

    toJSON() {
      return {
        payments: this.payments.map(p => ({ date: p.date.toISOString(), amount: p.amount }))
      };
    }

    /**
   * @param {Payment[]} [payments]
   */
    constructor(payments=[]) {
        this.payments = payments;
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
   */
    addPayment2(date, amount) {
        this.payments.push({ date, amount });
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
