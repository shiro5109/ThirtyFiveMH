export class Calendar35 {
    /**
     * @param {number} year
     * @param {number} month
     */
    constructor(year, month) {
        this.year = year;
        this.month = month;
    }

    CalcFirstDate() {
        let firstDay31 = 1 + 35 * (this.month - 1);
        const date31 = new Date(this.year, 0, 1); // 1/1
        date31.setDate(firstDay31);
        return date31;
    }

    createDateArray() {
        let firstDay31 = calendar35.CalcFirstDate();
        console.log(`firstDay31: ${firstDay31}`);
        let totalDays = dateDiffInDays(new Date(today.getFullYear(), 0, 1), firstDay31) + 1;
        console.log(`totalDays: ${totalDays}`);

        const dates = [];

        const firstDayWeekday = firstDay31.getDay();
        const blankCellNum = (firstDayWeekday + 6) % 7;//月曜始まりに変換
        for (let i = 0; i < blankCellNum; i++) {
            dates.push(null);
        }
        for (let i = 1; i <= 35; i++) {
            let date = new Date(today.getFullYear(), 0, 1);
            date.setDate(totalDays + i - 1);
            dates.push(date);
        }
        for (let i = dates.length; i < 42; i++) {
            dates.push(null);
        }
        return dates;
    }
}
