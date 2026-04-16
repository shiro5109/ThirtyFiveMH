/**
 * @param {HTMLTableRowElement} tr2
 * @param {number} value
 */
export function createNonEditableCell(tr2, value) {
    const tdVal = document.createElement('td');
    tdVal.classList.add('summaryTD');
    tdVal.textContent = value.toString();
    tr2.appendChild(tdVal);
}
