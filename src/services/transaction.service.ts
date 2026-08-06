import api from "@/lib/axios";
import { TransactionBody } from "@/schemas/transaction.schema";

export async function getTransaction() {
    const response = await api.get("/transaction/fetch");
    return response.data;
}

export async function createTransaction(data: TransactionBody) {
    const response = await api.post("/transaction/create", data);
    return response.data;
}