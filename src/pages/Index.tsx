import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import RecentTransactions from "@/components/home/RecentTransactions";
import HowItWorks from "@/components/home/HowItWorks";
import GlobalAccess from "@/components/home/GlobalAccess";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturedListings />
        <HowItWorks />
        <RecentTransactions />
        <GlobalAccess />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
