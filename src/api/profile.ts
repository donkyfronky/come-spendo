import type { User } from "@supabase/supabase-js";
import { client } from "./client";
import type { Tables } from "./database.types";

export type Profile = Tables<'profiles'>

export const getMyUserProfile = async () => {
  try {
    const user = await client.auth.getUser()
    const data = await getUserProfiles(user.data.user?.id)
    return data[0]
  } catch (error) {
    console.error("Error getMyUserProfile:", error);
    throw error;
  }

}
export const getUserProfiles = async (s?: User['id']) => {
  try {
    const query = client
      .from('profiles')
      .select();

    if (s) { query.eq('id', s) }

    const { data, error } = await query

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error getUserProfile:", error);
    throw error;
  }
};