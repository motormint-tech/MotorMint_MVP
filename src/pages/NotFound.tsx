import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-[120px] md:text-[180px] font-light leading-none text-foreground/90 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-4">
            Page not found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Something went wrong! We can't seem to find the page you are looking for.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="rounded-full px-6"
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
            <Link to="/">
              <Button className="rounded-full px-6">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
