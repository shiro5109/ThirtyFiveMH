/**
 * @param {(Date | null)[]} dates
 */
// @ts-ignore
export function calendarTable(dates, onCellTapped2,document,data) {
    const tbody = document.getElementById('calendarBody');
    // @ts-ignore
    tbody.innerHTML = "";
    let cellCounter = 0;
    for (let row = 0; row < 6; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < 7; col++) {
            const td = document.createElement('td');
            if (dates[cellCounter] != null) {
                const date = dates[cellCounter];
                // @ts-ignore
                td.innerHTML = date.getDate().toString();
                //TODO: 最初の日および1日には月表示を追加
                // @ts-ignore
                const totalPayment = data.CalcTotalPaymentOf(date);
                if (totalPayment > 0) {
                    td.innerHTML += "<br>" + totalPayment + "円";
                }
                td.addEventListener('click', () => {
                    // @ts-ignore
                    onCellTapped2(date);
                });
            } else {
                td.innerHTML = "";
            }
            //            td.textContent="aaa";
            tr.appendChild(td);
            cellCounter++;
        }

        // @ts-ignore
        tbody.appendChild(tr);
    }
}
