import api from "@/lib/axios";
import { WalletFormData } from "@/schemas/wallet.schema";

export async function getWallet(searchCode = "", searchName = "") {
    const response = await api.get("/wallet/fetch", {
        params: {
            searchCode,
            searchName
        }
    });
    return response.data;
}

export async function getWalletByCode(code: string) {
    const response = await api.get(`/wallet/fetch/${code}`);
    return response.data;
}

export async function createWallet(data: WalletFormData) {
    const response = await api.post("/wallet/create", data);
    return response.data;
}

export async function updateWallet(code: string, data: WalletFormData) {
    const response = await api.put(`/wallet/update/${code}`, data);
    return response.data;
}

export async function deleteWallet(code: string) {
    const response = await api.put(`/wallet/delete/${code}`);
    return response.data;
}