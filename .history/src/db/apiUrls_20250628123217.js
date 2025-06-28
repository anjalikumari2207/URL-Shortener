// src/db/apiUrls.js

import supabase, { supabaseUrl } from "./supabase";

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .limit(1)
    .maybeSingle(); // no error if not found

  if (error) {
    console.error("Error fetching long URL:", error);
    throw new Error("Failed to fetch URL");
  }

  if (!data) {
    throw new Error("Short URL not found");
  }

  return data;
}
