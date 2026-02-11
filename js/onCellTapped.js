import { Payment } from "./Payment.1.js";
import { render } from "./render.js";

/**
 * @param {Date} date
 */

export function onCellTapped(date, data) {
    const input = prompt(
        `金額を入力してください`
    );

    if (input === null) {
        // キャンセル
        return;
    }

    const amount = Number(input);

    if (isNaN(amount)) {
        alert("数値を入力してください");
        return;
    }

    console.log("入力された金額:", amount);
    const payment = new Payment(amount, date);
    data.addPayment(payment);
    render();
}
