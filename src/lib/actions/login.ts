"use server";
import { createClient } from "@/lib/supabase/server";

const supabase = createClient();

export async function signIn(formData: { email: string; password: string }) {
  // add zod validation here as well later
  const { email, password } = formData;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(error);
  if (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
  console.log(data);
  return { success: true, message: "User signed in successfully!" };
}
