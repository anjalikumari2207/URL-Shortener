import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>

      <div className="bg-[#101624] w-full max-w-md rounded-lg p-6 border border-gray-600 shadow-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0a0e1a] text-white border border-gray-600 rounded-md overflow-hidden mb-4">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-red-700 data-[state=active]:text-white py-2"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-red-700 data-[state=active]:text-white py-2"
            >
              Signup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth;
