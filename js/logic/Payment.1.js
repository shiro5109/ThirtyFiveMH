export class Payment {
    /**
     * @param {number} amount
     * @param {Date} date
     * @param {string} type
     */
    constructor(amount, date,type) {//TODO: comment取る
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.comment = ""
    }
}
