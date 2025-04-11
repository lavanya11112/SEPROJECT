
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    navigate('/', { replace: true });
  };
  
  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <MotionDiv animation="fade-in" className="mb-16 mt-12">
            <h1 className="text-4xl md:text-5xl font-medium text-center mb-3">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              {activeTab === "login" 
                ? "Sign in to your account to order delicious food from Flavours of India" 
                : "Join us to order delicious Indian food delivered to your doorstep"}
            </p>
          </MotionDiv>
          
          <div className="max-w-md mx-auto mb-20">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="login" className="mt-0">
                  <LoginForm onSuccess={handleAuthSuccess} />
                </TabsContent>
                <TabsContent value="signup" className="mt-0">
                  <SignupForm onSuccess={handleAuthSuccess} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
