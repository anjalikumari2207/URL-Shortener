import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-8">
        The only URL Shortener <br /> you’ll ever need! <span className="text-yellow-400">👇</span>
      </h1>

      {/* Input + Button */}
      <form
        onSubmit={handleShorten}
        className="flex flex-col sm:flex-row items-center w-full max-w-2xl gap-4"
      >
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

      {/* Banner Image */}
      <img
        src="banner1.png"
        alt="Banner"
        className="mt-12 max-w-5xl w-full rounded-lg shadow-lg md:px-11"
      />

      {/* Accordion FAQ */}
      <div className="w-full mt-12 md:px-11 max-w-5xl">
        <Accordion type="multiple" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the Trimrr URL shortener work?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version of
              that URL. This shortened URL redirects to the original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view analytics, and
              customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks and device
              types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
