// src/pages/redirect-link.jsx

import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  useEffect(() => {
    fn(); // Fetch the original URL
  }, []);

  useEffect(() => {
    if (!loading && data?.original_url && data?.id) {
      storeClicks({
        id: data.id,
        originalUrl: data.original_url,
      }); // 🔥 Record click

      setTimeout(() => {
        window.location.href = data.original_url; // ⏳ Give time to store click
      }, 100); // Slight delay to ensure async call starts
    }
  }, [loading, data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <BarLoader width={"100%"} color="#f43f5e" />
      <p className="mt-4 text-lg">Redirecting to your destination...</p>
    </div>
  );
};

export default RedirectLink;
