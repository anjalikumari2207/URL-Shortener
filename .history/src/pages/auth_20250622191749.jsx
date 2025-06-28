import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "@/components/form-login";
import SignupForm from "@/components/form-signup";

const Auth = () => (
  <div className="bg-[#0a0e1a] min-h-screen flex flex-col items-center justify-center px-4">
    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-white">
      Hold up! Let’s login first..
    </h1>
    <div className="bg-[#101624] p-6 rounded-lg w-full max-w-md border border-gray-600">
      <Tabs defaultValue="login">
        <TabsList className="mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><LoginForm /></TabsContent>
        <TabsContent value="signup"><SignupForm /></TabsContent>
      </Tabs>
    </div>
  </div>
);

export default Auth;
