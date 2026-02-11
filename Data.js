export class Data {
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
