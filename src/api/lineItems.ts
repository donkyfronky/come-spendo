import type { QueryData } from "@supabase/supabase-js";
import type { Categories } from "./categories";
import { client } from "./client";
import type { Tables } from "./database.types";

export type LineItems = Tables<"line_items">;

const LineItemsQuery = client
  .from("line_items")
  .select(
    `
  *,
  categories ( * )
  `,
  )
  .order("insert_date", { ascending: false });
export type LineItemsList = QueryData<typeof LineItemsQuery>;

export const getLineItemsList = async () => {
  try {
    const { data, error } = await LineItemsQuery;
    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error getLineItemsList:", error);
    throw error;
  }
};

export const deleteLineItems = async (
  lineItemsID: LineItems["id"],
): Promise<LineItems[]> => {
  try {
    const { data, error } = await client
      .from("line_items")
      .delete()
      .eq("id", lineItemsID)
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleteLineItems:", error);
    throw error;
  }
};
export const updateLineItems = async (
  id: LineItems["id"],
  description: string,
  quantity: number,
  unit_price: number,
  total_amount: number,
  out: boolean,
  tags?: Categories["id"][],
) => {
  try {
    const { data, error } = await client
      .from("line_items")
      .update({
        description,
        quantity,
        unit_price,
        total_amount,
        out,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    if (tags && tags.length > 0) {
      await client.from("line_item_categories").delete().eq("line_item_id", id);

      const { error: tagError } = await client
        .from("line_item_categories")
        .insert(
          tags?.map((tagid) => ({ line_item_id: id, category_id: tagid })),
        )
        .select();
      if (tagError) throw tagError;
    }

    return data;
  } catch (error) {
    console.error("Error updateLineItems:", error);
    throw error;
  }
};
export const saveLineItems = async (
  description: string,
  quantity: number,
  unit_price: number,
  total_amount: number,
  out: boolean,
  tags?: Categories["id"][],
): Promise<LineItems> => {
  try {
    const { data: lineItem, error: lineItemError } = await client
      .from("line_items")
      .insert({
        description,
        quantity,
        unit_price,
        total_amount,
        out,
      })
      .select()
      .single();
    if (lineItemError) throw lineItemError;

    const { id } = lineItem;

    if (tags && tags.length > 0) {
      const { error } = await client
        .from("line_item_categories")
        .insert(
          tags?.map((tagid) => ({ line_item_id: id, category_id: tagid })),
        )
        .select();
      if (error) {
        await client.from("line_items").delete().eq("id", id);
        throw error;
      }
    }

    return lineItem;
  } catch (error) {
    console.error("Error saveLineItems:", error);
    throw error;
  }
};
