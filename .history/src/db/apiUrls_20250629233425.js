import supabase, { supabaseUrl } from "./supabase";

// Fetch all URLs for a given user
export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

// Fetch a specific URL for a user
export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short URL not found");
  }

  return data;
}

// Fetch original URL by short/custom ID
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching short link:", error);
    throw new Error("Failed to resolve short URL");
  }

  return data;
}

// Create new short URL with optional custom URL and QR code
export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    throw new Error("QR code upload failed: " + storageError.message);
  }

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([{
      title,
      user_id,
      original_url: longUrl,
      custom_url: customUrl || null,
      short_url,
      qr,
    }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

// Delete a URL by ID
export async function deleteUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete URL");
  }

  return data;
}
