//@ts-check

import{ Data } from "../logic/Data.js";
import { ExpenseTypes, valueToLabel } from "../logic/ExpenseTypes.js";
import { Payment } from "../logic/Payment.1.js";

export class EditExpense {
  /**
   * @param {Payment} payment
   */
  DrawPaymentRow(payment) {
    const table = document.getElementById("tableEditExpense");
    if(!table) throw new Error("expenseTable not found");
    if(!(table instanceof HTMLTableElement)) throw new Error("expenseTable is not a table");

    const row = table.insertRow(1);
    
    const dateCell = row.insertCell();
    const date=payment.date;
    dateCell.textContent = date.getFullYear()+"年"+(date.getMonth()+1)+"/"+date.getDate();
    
    const typeCell = row.insertCell();
    typeCell.textContent = valueToLabel(payment.type);
    
    const amountCell = row.insertCell();
    amountCell.textContent = payment.amount.toString()+"円";
    
    const commentCell = row.insertCell();
    commentCell.textContent = payment.comment || "";
    
    const buttonCell = row.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    buttonCell.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      if (confirm(dateCell.textContent+"の"+typeCell.textContent
        +"の出費"+amountCell.textContent+"を本当に削除しますか？")) {
          // 「はい」を押した場合の処理
          this.data.DeletePayment(payment);
          this.refresh();
      } else {
          // 「いいえ」を押した場合の処理
//          logger.info("ユーザーが削除をキャンセルしました");
      }
    });
  }

  /**
   * @param {Data} data
   * @param {()=>void} refresh
   */
  constructor(data,refresh){
    this.data=data;
    this.refresh=refresh;
  }

  RenderExpenseTable() {
    this.data.DrawPaymentLows(this);
  }
}

