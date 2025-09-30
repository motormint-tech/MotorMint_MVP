import { CheckCircle, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-primary font-medium text-sm tracking-wide">
              Established in 2015
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Premier{" "}
              <span className="text-gradient-cyan">Modified</span>{" "}
              Listing Platform
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm">Curated listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm">Quality builds</span>
              </div>
            </div>

            <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
              The largest and most effective digital platform that's tailored for 
              highly modified vehicles, including street cars, performance trucks/SUVs, 
              and more.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/listings">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-border hover:bg-secondary group"
                >
                  Browse listings
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/submit">
                <Button 
                  size="lg" 
                  className="rounded-full"
                >
                  Submit a vehicle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="row-span-2">
                <img
                  src={heroCar1}
                  alt="Modified Lamborghini"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              {/* Top right image */}
              <div>
                <img
                  src={heroCar2}
                  alt="Modified Corvette"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
              </div>
              {/* Bottom right image */}
              <div>
                <img
                  src={heroCar3}
                  alt="Performance Engine"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
