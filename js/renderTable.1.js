
export const categories = ["食費", "日用品", "ガソリン"];

export function renderTable(document) {
    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        const tr = document.createElement('tr');
        const tdCat = document.createElement('td');
        tdCat.textContent = cat;
        const tdVal = document.createElement('td');
        tdVal.textContent = budget[i].toString();
        tdVal.contentEditable = 'true'; // 編集可能
        tdVal.addEventListener('input', () => budget[i] = Number(tdVal.textContent));
        tr.appendChild(tdCat);
        tr.appendChild(tdVal);
        // @ts-ignore
        tbody.appendChild(tr);
    });
}
