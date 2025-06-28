import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateLink } from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";

import { toast } from "sonner";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    (url?.title ?? "")
      .toLowerCase()
      .includes((searchQuery ?? "").toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 text-white">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#f43f5e" />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-[#0f172a] border border-gray-700 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Links Created</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {urls?.length || 0}
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border border-gray-700 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {clicks?.length || 0}
          </CardContent>
        </Card>
      </div>

      {/* My Links & Create */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink
          onSuccess={() => {
            toast.success("Short link created successfully!");
            fnUrls();
          }}
        />
      </div>

      {/* Search Filter */}
      <div className="relative mt-2">
        <Input
          type="text"
          placeholder="Filter Links..."
          className="bg-[#0a0e1a] border border-gray-700 text-white placeholder-gray-400 pl-4 pr-10 py-2 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2.5 right-3 w-5 h-5 text-gray-400" />
      </div>

      {error && <Error message={error.message} />}

      {/* Link Cards */}
      <div className="mt-4 flex flex-col gap-4">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
