//@ts-check

import { closeDialog } from "./closeDialog.js";

export class DialogOverLay {
    /**
     * @type {Date | null}
     */
    date = null;

    /**
     * @param {import("./logic/Data.js").Data} data
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * @param {{ (): void; (): void; }} refresh
     */
    InitializeSaveButton(refresh){
          // @ts-ignore
          document.getElementById("saveBtn").addEventListener("click", () => {
              // @ts-ignore
              const amount = Number(document.getElementById("amountInput").value);
              // @ts-ignore
              const type = document.getElementById("typeSelect").value;
        
              if (!amount || amount <= 0) {
                  alert("正しい金額を入力してください");
                  return;
              }
        
              console.log(amount, type);

              if(this.date==null) throw new Error("date is null");
              this.data.addPayment2(this.date, amount, type);

              localStorage.setItem("data", JSON.stringify(this.data));

              refresh();

              closeDialog();
          });
    }
}