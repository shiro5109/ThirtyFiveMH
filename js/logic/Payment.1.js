export class Payment {
    /**
     * @param {number} amount
     * @param {Date} date
     * @param {string} type
     */
    constructor(amount, date,type) {
        this.amount = amount;
        this.date = date;
        this.type = type;
    }
}
