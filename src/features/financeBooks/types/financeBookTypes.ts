export interface FinanceBookTypes {
    code: string;
    name: string;
    description: string | null;
    logo: string | null;
    type: "PERSONAL" | "BUSSINESS";
}