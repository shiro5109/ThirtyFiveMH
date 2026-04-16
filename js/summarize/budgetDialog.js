// @ts-check

export class BudgetDialog {
    /**
     * @type {(value: number) => void}
     */
    OnDecide = () => {};

    constructor() {
        // @ts-ignore
        document.getElementById("budgetSaveBtn").addEventListener("click", () => {
            // @ts-ignore
            this.OnDecide(Number(document.getElementById("budgetAmountInput")?.value));

            console.log("overlay", document.getElementById("budgetDialogOverlay"));
            
            // @ts-ignore
            document.getElementById("budgetAmountInput").value = "";
            // @ts-ignore
            document.getElementById("budgetDialogOverlay").classList.add("hidden");

            this.OnDecide = () => {};
        });

        document.getElementById("budgetCancelBtn")?.addEventListener("click", () => {
            // @ts-ignore
            document.getElementById("budgetAmountInput").value = "";
            // @ts-ignore
            document.getElementById("budgetDialogOverlay").classList.add("hidden");

            this.OnDecide = () => {};
        });
    }
}