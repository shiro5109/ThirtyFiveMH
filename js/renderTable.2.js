
export function renderTable(budget2,categories) {
    const tbody = document.getElementById('tableBody');
    // @ts-ignore
    tbody.innerHTML = "";
    categories.forEach((cat, i) => {
        {
            const tr = document.createElement('tr');
            const tdCat = document.createElement('td');
            tdCat.textContent = cat;
            tr.appendChild(tdCat);
            tbody.appendChild(tr);
        }

        const tr2=document.createElement('tr');    
        const tdBlank = document.createElement('td');
        tr2.appendChild(tdBlank);

        for(let j=0;j<5;j++){
            createEditableCell(budget2, i, tr2);
        }

        tbody.appendChild(tr2);
    });
}

function createEditableCell(budget2, i, tr2) {
        const tdVal = document.createElement('td');
        tdVal.textContent = budget2[i].toString();
        tdVal.contentEditable = 'true'; // 編集可能
        tdVal.addEventListener('input', () => budget2[i] = Number(tdVal.textContent));
        tr2.appendChild(tdVal);
}