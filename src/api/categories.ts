import { client } from "./client";
import type { Tables } from "./database.types";

export type Categories = Tables<'categories'>

export const getCategoryList = async () => {
  try {
    const { data, error } = await client
      .from("categories")
      .select()
      .order('name', { ascending: true });
    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error getCategoryList:", error);
    throw error;
  }
};

export const deleteCategory = async (
  categoryID: Categories["id"]
): Promise<Categories[]> => {
  try {
    const { data, error } = await client
      .from("categories")
      .delete()
      .eq("id", categoryID)
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleteCategory:", error);
    throw error;
  }
};

export const saveCategory = async (
  name: string
): Promise<Categories> => {
  try {
    const { data, error } = await client
      .from("categories")
      .insert({ name })
      .select()
      .single();
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error saveCategory:", error);
    throw error;
  }
};