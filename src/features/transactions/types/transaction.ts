export interface TransactionTypes {
    code: string;
    categoryCode: string;
    walletCode: string;
    contectCode: string;
    categoryName: string;
    walletName: string;
    contactName: string;
    name: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    icon: string | null;
    color: string | null;
    description: string | null;
    date: string;
}