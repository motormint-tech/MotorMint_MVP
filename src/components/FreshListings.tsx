import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featuredTruck from "@/assets/featured-truck.jpg";
import featuredCamaro from "@/assets/featured-camaro.jpg";
import featuredCorvette from "@/assets/featured-corvette.jpg";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";

interface FreshVehicle {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
}

const freshVehicles: FreshVehicle[] = [
  {
    id: "fresh-1",
    title: "2015 Chevrolet Corvette Stingray Z51",
    price: "$44,999",
    location: "Miami, FL",
    image: featuredCorvette,
  },
  {
    id: "fresh-2",
    title: "999whp 2023 BMW M340i",
    price: "$57,000",
    location: "West Monroe, LA",
    image: heroCar1,
  },
  {
    id: "fresh-3",
    title: "1800hp 2010 Nissan GTR Premium",
    price: "$149,990",
    location: "Oklahoma City, OK",
    image: heroCar2,
  },
  {
    id: "fresh-4",
    title: "1300whp 2007 GMC Sierra 1500",
    price: "$42,900",
    location: "Chicago, IL",
    image: featuredTruck,
  },
  {
    id: "fresh-5",
    title: "600+whp 2009 BMW 135i Coupe",
    price: "$12,000",
    location: "Springfield, MO",
    image: heroCar3,
  },
  {
    id: "fresh-6",
    title: "1100whp 2019 ROUSH Stage 3 Mustang",
    price: "$120,000",
    location: "Fort Worth, TX",
    image: featuredCamaro,
  },
];

const FreshListings = () => {
  return (
    <section className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold mb-6 text-muted-foreground">
          Fresh on the market
        </h2>

        {/* Horizontal Scrolling List */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {freshVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/listing/${vehicle.id}`}
              className="flex-shrink-0 flex items-center gap-3 bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors min-w-[300px]"
            >
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground line-clamp-1">
                  {vehicle.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {vehicle.price} - {vehicle.location}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-6 text-center">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Show More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreshListings;
