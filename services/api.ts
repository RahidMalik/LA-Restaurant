import { ApiClient } from "@/lib/api-client";
import type { MenuItem, Category } from "@/types";

// --- Menu Controller ---
class MenuController extends ApiClient {
    async getAll() {
        return this.axiosInstance.get<never, MenuItem[]>("/menu");
    }

    async getByCategory(category: string) {
        return this.axiosInstance.get<never, MenuItem[]>(`/menu?category=${category}`);
    }

    async getFeatured() {
        return this.axiosInstance.get<never, MenuItem[]>("/menu/featured");
    }

    async getById(id: string) {
        return this.axiosInstance.get<never, MenuItem>(`/menu/${id}`);
    }

    async search(query: string) {
        return this.axiosInstance.get<never, MenuItem[]>(`/menu/search?q=${query}`);
    }

    // Admin Methods
    async create(item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">) {
        return this.axiosInstance.post<never, MenuItem>("/admin/menu", item);
    }

    async update(id: string, updates: Partial<MenuItem>) {
        return this.axiosInstance.patch<never, MenuItem>(`/admin/menu/${id}`, updates);
    }

    async delete(id: string) {
        return this.axiosInstance.delete(`/admin/menu/${id}`);
    }
}

// --- Category Controller ---
class CategoryController extends ApiClient {
    async getAll() {
        return this.axiosInstance.get<never, Category[]>("/categories");
    }

    async create(category: Omit<Category, "id">) {
        return this.axiosInstance.post<never, Category>("/admin/categories", category);
    }

    async delete(id: string) {
        return this.axiosInstance.delete(`/admin/categories/${id}`);
    }
}

// --- Export Instances ---
export const menuApi = new MenuController();
export const categoryApi = new CategoryController();