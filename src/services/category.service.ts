import api from "@/lib/axios";
import { CategoryFormData } from "@/schemas/category.schema";

export async function getCategory() {
    const response = await api.get("/category/fetch");
    return response.data;
}

export async function getCategoryByCode(code: string) {
    const response = await api.get(`/category/fetch/${code}`);
    return response.data;
}

export async function createCategory(data: CategoryFormData) {
    const response = await api.post("/category/create", data);
    return response.data;
}

export async function updateCategory(code: string, data: CategoryFormData) {
    const response = await api.put(`/category/update/${code}`, data);
    return response.data;
}