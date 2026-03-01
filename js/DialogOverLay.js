import { closeDialog } from "./closeDialog.js";

export class DialogOverLay {
    date;

    constructor(data) {
        this.data = data;
    }
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

              this.data.addPayment2(this.date, amount);
              if(this.date==null) throw new Error("date is null");

              refresh();

              closeDialog();
          });
    }
}