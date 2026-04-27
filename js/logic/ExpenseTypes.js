export const ExpenseTypes = {
    Food: { value: "food", label: "食費" },
    Daily: { value: "daily", label: "日用品" },
    Gas: { value: "gas", label: "ガソリン" },
    Medical: { value: "medical", label: "医療費" },
    Social: { value: "social", label: "交際費" },
    Dining: { value: "dining", label: "外食" }
};

export function valueToLabel(value) {
    if (!value) return "";

    // value で一致するものを探す
    for (const key in ExpenseTypes) {
        if (ExpenseTypes[key].value === value) {
            return ExpenseTypes[key].label;
        }
    }

    // 見つからなかった場合は元の値を返す（エラー防止）
    return value;
}