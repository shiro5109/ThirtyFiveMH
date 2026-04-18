//@ts-check

import { closeDialog } from "./closeDialog.js";

export class DialogOverLay {
    Reset() {
        const amountInput = document.getElementById("amountInput");
        if(!(amountInput instanceof HTMLInputElement)) {
            alert("amountInput not found");
            return;
        }
        amountInput.value = "";
    }
    Show() {
        document.getElementById("dialogOverlay")?.classList.remove("hidden");
    }
    /**
     * @type {Date | null}
     */
    date = null;

    /**
     * @param {import("../logic/Data.js").Data} data
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * @param {{ (): void; (): void; }} refresh
     */
    InitializeSaveButton(refresh){
        const saveBtn = document.getElementById("saveBtn");
        if(!saveBtn) throw new Error("saveBtn not found");
        
        saveBtn.addEventListener("click", () => this.SaveButtonClicked(refresh));
    }

    /**
     * @param {() => void} refresh
     */
    SaveButtonClicked(refresh) {
        const amountInput = document.getElementById("amountInput");
        if(!(amountInput instanceof HTMLInputElement)) throw new Error("amountInput not found");

        const amount = Number(amountInput.value);

        if (!amount || amount <= 0) {
            alert("正しい金額を入力してください");
            return;
        }

        const select= document.getElementById("typeSelect");
        if(!(select instanceof HTMLSelectElement)) throw new Error("typeSelect not found");
        const type = select.value;

        console.log(amount, type);

        if(this.date==null) throw new Error("date is null");
        this.data.addPayment2(this.date, amount, type);

        localStorage.setItem("data", JSON.stringify(this.data));

        refresh();

        closeDialog();
    }
}

