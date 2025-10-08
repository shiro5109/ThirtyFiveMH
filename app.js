const categories = ["食費", "日用品", "ガソリン"];
let budget = [0, 0, 0];

function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        const tr = document.createElement('tr');
        const tdCat = document.createElement('td');
        tdCat.textContent = cat;
        const tdVal = document.createElement('td');
        tdVal.textContent = budget[i];
        tdVal.contentEditable = true; // 編集可能
        tdVal.addEventListener('input', () => budget[i] = Number(tdVal.textContent));
        tr.appendChild(tdCat);
        tr.appendChild(tdVal);
        tbody.appendChild(tr);
    });
}

document.getElementById('recalculate').addEventListener('click', () => {
    alert("合計: " + budget.reduce((a, b) => a + b, 0));
});

document.getElementById('prev').addEventListener('click', () => {/* 前月処理 */ });
document.getElementById('next').addEventListener('click', () => {/* 翌月処理 */ });

renderTable();
