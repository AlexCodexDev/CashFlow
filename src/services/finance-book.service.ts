import api from "@/lib/axios";

export async function getFinanceBook() {
    const response = await api.get("/finance-book/fetch");
    return response.data;
}