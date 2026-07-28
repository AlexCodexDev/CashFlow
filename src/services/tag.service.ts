import api from "@/lib/axios";
import { TagFormData } from "@/schemas/tag.schema";

export async function getTag() {
    const response = await api.get("/tag/fetch");
    return response.data;
}

export async function getTagByCode(code: string) {
    const response = await api.get(`/tag/fetch/${code}`);
    return response.data;
}

export async function createTag(data: TagFormData) {
    const response = await api.post("/tag/create", data);
    return response.data;
}

export async function updateTag(code: string, data: TagFormData) {
    const response = await api.put(`/tag/update/${code}`, data);
    return response.data;
}

export async function deleteTag(code: string) {
    const response = await api.delete(`/tag/delete/${code}`);
    return response.data;
}