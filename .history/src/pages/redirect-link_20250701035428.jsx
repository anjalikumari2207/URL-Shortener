import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn(); // Get long URL
  }, []);

  useEffect(() => {
    const logClickAndRedirect = async () => {
      if (!loading && data?.original_url) {
        try {
          await fnStats(); // ✅ Wait until the click is recorded
        } catch (e) {
          console.error("Click recording failed", e);
        } finally {
          window.location.href = data.original_url;
        }
      }
    };

    logClickAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <BarLoader width={"100%"} color="#f43f5e" />
      <p className="mt-4 text-lg">Redirecting to your destination...</p>
    </div>
  );
};

export default RedirectLink;
