
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionDiv } from "@/components/ui/MotionDiv";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 min-h-[70vh]">
        <Container>
          <MotionDiv animation="fade-in" className="text-center max-w-md mx-auto">
            <h1 className="text-9xl font-display font-medium mb-4">404</h1>
            <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button className="rounded-full" asChild>
              <a href="/">Return to Home</a>
            </Button>
          </MotionDiv>
        </Container>
      </main>
      <Footer />
    </>
  );
}
