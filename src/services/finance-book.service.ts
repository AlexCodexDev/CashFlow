import api from "@/lib/axios";
import { FinanceBookBody, FinanceBookParams } from "@/schemas/financeBook.schema";

export async function getFinanceBook() {
    const response = await api.get("/finance-book/fetch");
    return response.data;
}

export async function getFinanceBookByCode(code: FinanceBookParams) {
    const response = await api.get(`/finance-book/fetch/${code.code}`);
    return response.data;
}

export async function createFinanceBook(data: FinanceBookBody) {
    const response = await api.post("/finance-book/create", data);
    return response.data;
}

export async function updateFinanceBook(code: FinanceBookParams, data: FinanceBookBody) {
    const response = await api.put(`/finance-book/update/${code.code}`, data);
    return response.data;
}