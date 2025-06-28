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
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data?.original_url) {
      fnStats();
      window.location.href = data.original_url; // ✅ Redirect
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <BarLoader width={"100%"} color="#f43f5e" />
        <p className="mt-4 text-lg">Redirecting to your destination...</p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
