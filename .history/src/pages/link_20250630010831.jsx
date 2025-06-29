import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkPage = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error]);

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title || "zaplink-qr";

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const link = url?.custom_url || url?.short_url || "";

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        {/* Left Side: URL Info */}
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>

          <a
            href={`https://zaplink.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://zaplink.in/{link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {url?.created_at
              ? new Date(url.created_at).toLocaleString()
              : "Date unknown"}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(`https://zaplink.in/${link}`);
              }}
            >
              <Copy />
            </Button>

            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>

            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => navigate("/dashboard"))}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>

          {url?.qr ? (
            <img
              src={url.qr}
              className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
              alt="QR Code"
            />
          ) : (
            <span className="italic text-gray-500">QR code not available</span>
          )}
        </div>

        {/* Right Side: Stats */}
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />

              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics available yet."
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
