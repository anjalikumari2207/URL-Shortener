import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-8">
        The only URL Shortener <br /> you’ll ever need! <span className="text-yellow-400">👇</span>
      </h1>

      <form onSubmit={handleShorten} className="flex flex-col sm:flex-row items-center w-full max-w-2xl gap-4">
        <Input
          type="url"
          placeholder="Enter your loooong URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-1 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 px-4 py-3 rounded-md"
        />
        <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md">
          Shorten!
        </Button>
      </form>

      <img src="banner1.png" alt="Banner" className="mt-12 max-w-2xl w-full rounded-lg shadow-lg" />
    </div>
  );
};

export default LandingPage;
