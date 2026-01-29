import { client } from "./client";

/**
 * Fetches the line-items balance for a user from the user_line_items_balance DB function.
 * Returns a number (out=true => negative, out=false => positive).
 */
export const getBalance = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await client.rpc("user_line_items_balance", {
      p_user_id: userId,
    });
    if (error) throw error;
    const value = typeof data === "number" ? data : Number(data);
    return Number.isFinite(value) ? value : 0;
  } catch (error) {
    console.error("Error getBalance:", error);
    throw error;
  }
};
