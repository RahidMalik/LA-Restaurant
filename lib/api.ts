// /**
//  * ─────────────────────────────────────────────────────────────
//  *  api.ts  —  Restaurant Menu · All API Calls in One Place
//  *  Built with Supabase · Clean · Professional · Scalable
//  * ─────────────────────────────────────────────────────────────
//  */

// import { supabase } from "./supabase";
// import type { MenuItem, Category } from "@/types";

// // ─────────────────────────────────────────────
// //  MENU ITEMS
// // ─────────────────────────────────────────────

// /** Get all available menu items */
// export async function getAllMenuItems(): Promise<MenuItem[]> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .eq("is_available", true)
//     .order("created_at", { ascending: false });

//   if (error) throw new Error(`Failed to fetch menu items: ${error.message}`);
//   return data ?? [];
// }

// /** Get menu items by category */
// export async function getMenuItemsByCategory(
//   category: string
// ): Promise<MenuItem[]> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .eq("category", category)
//     .eq("is_available", true)
//     .order("name", { ascending: true });

//   if (error)
//     throw new Error(`Failed to fetch items by category: ${error.message}`);
//   return data ?? [];
// }

// /** Get featured menu items (shown on homepage) */
// export async function getFeaturedItems(): Promise<MenuItem[]> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .eq("is_featured", true)
//     .eq("is_available", true)
//     .limit(6);

//   if (error) throw new Error(`Failed to fetch featured items: ${error.message}`);
//   return data ?? [];
// }

// /** Get a single menu item by ID */
// export async function getMenuItemById(id: string): Promise<MenuItem | null> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw new Error(`Failed to fetch item: ${error.message}`);
//   return data;
// }

// /** Search menu items by name or description */
// export async function searchMenuItems(query: string): Promise<MenuItem[]> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
//     .eq("is_available", true);

//   if (error) throw new Error(`Search failed: ${error.message}`);
//   return data ?? [];
// }

// // ─────────────────────────────────────────────
// //  ADMIN — CREATE / UPDATE / DELETE
// // ─────────────────────────────────────────────

// /** Add a new menu item (admin only) */
// export async function addMenuItem(
//   item: Omit<MenuItem, "id" | "created_at">
// ): Promise<MenuItem> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .insert([item])
//     .select()
//     .single();

//   if (error) throw new Error(`Failed to add item: ${error.message}`);
//   return data;
// }

// /** Update an existing menu item (admin only) */
// export async function updateMenuItem(
//   id: string,
//   updates: Partial<MenuItem>
// ): Promise<MenuItem> {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw new Error(`Failed to update item: ${error.message}`);
//   return data;
// }

// /** Delete a menu item (admin only) */
// export async function deleteMenuItem(id: string): Promise<void> {
//   const { error } = await supabase
//     .from("menu_items")
//     .delete()
//     .eq("id", id);

//   if (error) throw new Error(`Failed to delete item: ${error.message}`);
// }

// /** Toggle item availability (admin only) */
// export async function toggleItemAvailability(
//   id: string,
//   is_available: boolean
// ): Promise<void> {
//   const { error } = await supabase
//     .from("menu_items")
//     .update({ is_available })
//     .eq("id", id);

//   if (error) throw new Error(`Failed to toggle availability: ${error.message}`);
// }

// /** Toggle featured status (admin only) */
// export async function toggleFeatured(
//   id: string,
//   is_featured: boolean
// ): Promise<void> {
//   const { error } = await supabase
//     .from("menu_items")
//     .update({ is_featured })
//     .eq("id", id);

//   if (error) throw new Error(`Failed to toggle featured: ${error.message}`);
// }

// // ─────────────────────────────────────────────
// //  CATEGORIES
// // ─────────────────────────────────────────────

// /** Get all categories */
// export async function getCategories(): Promise<Category[]> {
//   const { data, error } = await supabase
//     .from("categories")
//     .select("*")
//     .order("name", { ascending: true });

//   if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
//   return data ?? [];
// }

// /** Add a new category (admin only) */
// export async function addCategory(
//   category: Omit<Category, "id">
// ): Promise<Category> {
//   const { data, error } = await supabase
//     .from("categories")
//     .insert([category])
//     .select()
//     .single();

//   if (error) throw new Error(`Failed to add category: ${error.message}`);
//   return data;
// }

// /** Delete a category (admin only) */
// export async function deleteCategory(id: string): Promise<void> {
//   const { error } = await supabase
//     .from("categories")
//     .delete()
//     .eq("id", id);

//   if (error) throw new Error(`Failed to delete category: ${error.message}`);
// }

// // ─────────────────────────────────────────────
// //  IMAGE UPLOAD
// // ─────────────────────────────────────────────

// /** Upload image to Supabase Storage and return public URL */
// export async function uploadItemImage(
//   file: File,
//   itemName: string
// ): Promise<string> {
//   const fileExt = file.name.split(".").pop();
//   const fileName = `${itemName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`;
//   const filePath = `menu-items/${fileName}`;

//   const { error: uploadError } = await supabase.storage
//     .from("restaurant-images")
//     .upload(filePath, file);

//   if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

//   const { data } = supabase.storage
//     .from("restaurant-images")
//     .getPublicUrl(filePath);

//   return data.publicUrl;
// }

// /** Delete image from Supabase Storage */
// export async function deleteItemImage(imageUrl: string): Promise<void> {
//   const path = imageUrl.split("/restaurant-images/")[1];
//   if (!path) return;

//   const { error } = await supabase.storage
//     .from("restaurant-images")
//     .remove([`menu-items/${path}`]);

//   if (error) throw new Error(`Failed to delete image: ${error.message}`);
// }

// // ─────────────────────────────────────────────
// //  ADMIN AUTH
// // ─────────────────────────────────────────────

// /** Admin login */
// export async function adminLogin(
//   email: string,
//   password: string
// ): Promise<void> {
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) throw new Error(`Login failed: ${error.message}`);
// }

// /** Admin logout */
// export async function adminLogout(): Promise<void> {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw new Error(`Logout failed: ${error.message}`);
// }

// /** Check if admin is currently logged in */
// export async function getAdminSession() {
//   const { data } = await supabase.auth.getSession();
//   return data.session;
// }

// // ─────────────────────────────────────────────
// //  DATABASE CONNECTION TEST
// // ─────────────────────────────────────────────

// /** Test database connection */
// export async function testDatabaseConnection() {
//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .limit(5);

//   return {
//     success: !error,
//     error: error ? { message: error.message, code: error.code, details: error.details } : null,
//     itemCount: data?.length || 0,
//     data: data || [],
//   };
// }
