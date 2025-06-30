import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn(); // fetch the long URL
  }, []);

  useEffect(() => {
    // when data is available, trigger click logging and then redirect
    if (!loading && data?.original_url) {
      fnStats().then(() => {
        window.location.href = data.original_url; // ✅ Wait before redirecting
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <BarLoader width={"100%"} color="#36d7b7" />
      <p className="mt-4 text-lg">Redirecting to your destination...</p>
    </div>
  );
};

export default RedirectLink;
