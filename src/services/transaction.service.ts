import api from "@/lib/axios";
import { TransactionBody, TransactionParams } from "@/schemas/transaction.schema";

export async function getTransaction() {
    const response = await api.get("/transaction/fetch");
    return response.data;
}

export async function getTransactionByCode(code: string) {
    const response = await api.get(`/transaction/fetch-by-code/${code}`);
    return response.data;
}

export async function createTransaction(data: TransactionBody) {
    const response = await api.post("/transaction/create", data);
    return response.data;
}

export async function updateTransaction(code: string, data: TransactionBody) {
    const response = await api.put(`/transaction/update/${code}`, data);
    return response.data;
}

export async function deleteTransaction(code: string) {
    const response = await api.put(`/transaction/delete/${code}`);
    return response.data;
}