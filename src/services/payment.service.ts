import api from "@/lib/axios";
import { PaymentFormData } from "@/schemas/payment.schema";

export async function getOptions() {
    const response = await api.get("/payment/options");
    return response.data;
}

export async function getPayment(searchCode = "", searchName = "") {
    const response = await api.get("/payment/fetch", {
        params: {
            searchCode,
            searchName
        }
    });
    return response.data;
}

export async function getPaymentByCode(code: string) {
    const response = await api.get(`/payment/fetch/${code}`);
    return response.data;
}

export async function createPayment(data: PaymentFormData) {
    const response = await api.post("/payment/create", data);
    return response.data;
}

export async function updatePayment(code: string, data: PaymentFormData) {
    const response = await api.put(`/payment/update/${code}`, data);
    return response.data;
}

export async function deletePayment(code: string) {
    const response = await api.put(`/payment/delete/${code}`);
    return response.data;
}