import { calendarTable } from "./calendarTable.1.js";
import { dateDiffInDays } from "./logic/dateDiffInDays.1.js";
import { renderTable } from "./renderTable.2.js";

/**
 * @param {Data} data
 */
export function render(data, calendar35, onCellTapped) {
    const categories = ["食費", "日用品", "ガソリン"];//TODO
    let budget = [0, 0, 0];//TODO

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

    renderTable(budget, categories);
    calendarTable(dates, onCellTapped, data, budget, categories,calendar35);

    // @ts-ignore
    document.getElementById('currentMonth').textContent = `${calendar35.year}年${calendar35.month}月`;
    //TODO: 正式には2月1日ならcalendar35.month=1となったほうが親切
}
