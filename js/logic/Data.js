export class Data {
    static fromJSON(data2) {
      const obj = typeof data2 === 'string' ? JSON.parse(data2) : data2;
      return new Data((obj.payments || []).map(p => ({ date: new Date(p.date), amount: p.amount })));
    }

    toJSON() {
      return {
        payments: this.payments.map(p => ({ date: p.date.toISOString(), amount: p.amount }))
      };
    }

    constructor(payments = []) {
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
     * @return {number}
     */
    CalcTotalPaymentOf(date) {
        return this.payments
            .filter(p => p.date.toDateString() === date.toDateString())
            .reduce((sum, p) => sum + p.amount, 0);
    }
}
