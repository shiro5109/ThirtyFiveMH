// @ts-check

import { dateDiffInDays } from "./logic/dateDiffInDays.1.js";
import { renderTable } from "./summarize/renderTable.2.js";
import { Data } from "./logic/Data.js";
import { Calendar35 } from "./logic/Calendar35.1.js";
import { BudgetDialog } from "./summarize/budgetDialog.js";
import { CalendarCell } from "./calendar/CalendarCell.js";

/**
 * @param {Data} data
 * @param {Calendar35} calendar35
 * @param { () => void} saveFunction
 * @param { () => void } refreshFunction
 * @param {BudgetDialog} budgetDialog
 * @param {CalendarCell} calendarCell
 */
export function render(data, calendar35,saveFunction,refreshFunction,budgetDialog,calendarCell) {
    let firstDay31 = calendar35.CalcFirstDate();
    console.log(`firstDay31: ${firstDay31}`);
    let totalDays = dateDiffInDays(new Date(calendar35.year, 0, 1), firstDay31) + 1;
    console.log(`totalDays: ${totalDays}`);

    const dates = [];

    const firstDayWeekday = firstDay31.getDay();
    const blankCellNum = (firstDayWeekday + 6) % 7; //月曜始まりに変換
    for (let i = 0; i < blankCellNum; i++) {
        dates.push(null);
    }
    for (let i = 1; i <= 35; i++) {
        let date = new Date(calendar35.year, 0, 1);
        date.setDate(totalDays + i - 1);
        dates.push(date);
    }
    for (let i = dates.length; i < 42; i++) {
        dates.push(null);
    }

    const summaryVM=data.CreateSummaryVM(calendar35,()=>saveFunction(),()=>refreshFunction(),budgetDialog);

    renderTable(summaryVM);

    calendarCell.RenderCalendarTable(dates);

    // @ts-ignore
    document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;
    //FUTURE: 正式には2月1日ならcalendar35.month=1となったほうが親切
}
