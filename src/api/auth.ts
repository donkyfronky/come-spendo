import { client } from "./client";
import type { Session,User } from "@supabase/supabase-js";

export const loginWithPassword = async (username: string, password: string) => {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: username,
        password,
      });
      if (error) throw error;
  
      return data;
    } catch (error) {
      console.error("Error login:", error);
      throw error;
    }
  };
export const logout =()=>{
    return client.auth.signOut();
}
export const getSession = ()=>{
    return client.auth.getSession()
}
export const verifyOtpEmail=(token_hash:string)=>{

    if (token_hash) {
        // Verify the OTP token
        return client.auth.verifyOtp({
            token_hash:'peiri',
            type: "email",
        })
    }
    throw new Error('No token provided')

}
export const retrieveUser = async () => {
    try {
      const { data, error } = await client.auth.getUser();
      if (error) throw error;
  
      return data;
    } catch (error) {
      console.error("Error retrieveUser:", error);
      throw error;
    }
  };
  
  export const changeUserPassword = async (newPassword: string) => {
    try {
      const { data, error } = await client.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
  
      return data;
    } catch (error) {
      console.error("Error changeUserPassword:", error);
      throw error;
    }
  };

  export type {Session,User}