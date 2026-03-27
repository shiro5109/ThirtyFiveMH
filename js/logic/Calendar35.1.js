// @ts-check

import { dateDiffInDays } from "./dateDiffInDays.1.js";
import { Payment } from "./Payment.1.js";

export class Calendar35 {
    IncreaseMonth() {
      if(this.month===12){
        this.year++;
        this.month=1;
      }else{
        this.month++;
      }
    }
    DecreaseMonth() {
      if(this.month===1){
        this.year--;
        this.month=12;
      }else{
        this.month--;
      } 
    }
    
    /**
     * @param {Payment[]} payments
     * @param {number} j
     */
    FilterPayments(payments, j) {
        var firstDay=this.CalcFirstDate();
        return payments.filter(p => {
            var diff = dateDiffInDays(firstDay,p.date)-7*j;
            return diff >= 0 && diff <= 6;
        });
    }
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

    /**
     * @param {Date} today
     */
    createDateArray(today) {
        let firstDay31 = this.CalcFirstDate();
//        console.log(`firstDay31: ${firstDay31}`);
        let totalDays = dateDiffInDays(new Date(today.getFullYear(), 0, 1), firstDay31) + 1;
  //      console.log(`totalDays: ${totalDays}`);

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
