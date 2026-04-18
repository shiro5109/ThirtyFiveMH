//@ts-check

import { DialogOverLay } from "../dialog/DialogOverLay.js";
import { Data } from "../logic/Data.js";

export class CalendarCell {
    /**
     * @param {(Date | null)[]} dates
     */
    RenderCalendarTable(dates) {
        const tbody = document.getElementById('calendarBody');
        if(!tbody) throw new Error("calendarBody not found");

        tbody.innerHTML = "";
        let cellCounter = 0;

        for (let row = 0; row < 6; row++) {
            const tr = document.createElement('tr');

            for (let col = 0; col < 7; col++) {
                const td=this.CreateHtmlCell(dates[cellCounter]);
                tr.appendChild(td);
                cellCounter++;
            }

            tbody.appendChild(tr);
        }
    }

    /**
     * @param {DialogOverLay} dialogOverLay
     * @param {Data} data
     */
    constructor(dialogOverLay, data) {
        this.dialogOverLay = dialogOverLay;
        this.data = data;
    }

    /**
     * @param {HTMLTableCellElement} td
     * @param {Date} date
     */
    AddEventListenerTo(td, date) {
        td.addEventListener('click', () => {
            this.dialogOverLay.Reset();
            this.dialogOverLay.Show();
            this.dialogOverLay.date = date;
        });
    }

    /**
     * @param {HTMLTableCellElement} td
     * @param {Date} date
     */
    SetString(td, date) {
        td.innerHTML = date.getDate().toString();
        //FUTURE: 最初の日および1日には月表示を追加?
        const totalPayment = this.data.CalcTotalPaymentOf(date);
        if (totalPayment > 0) {
            td.innerHTML += "<br>" + totalPayment + "円";
        }
    }

    /**
     * @param {Date | null} date
     */
    CreateHtmlCell(date) {
        const td = document.createElement('td');

        if (date == null) {
            td.innerHTML = "";
            return td;
        }

        this.SetString(td, date);
        this.AddEventListenerTo(td, date);

        return td;
    }
}
