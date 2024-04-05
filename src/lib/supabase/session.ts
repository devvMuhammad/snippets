import { createClient } from "./server";

export async function checkServerSession() {
  const supabase = createClient();
  return await supabase.auth.getUser();
}
