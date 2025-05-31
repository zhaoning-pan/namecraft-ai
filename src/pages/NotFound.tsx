import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - NameCraft AI"
        description="The page you're looking for doesn't exist. Return to NameCraft AI to continue finding perfect names."
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <p className="text-xl text-slate-600 mb-8">Page not found</p>
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Return to home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
