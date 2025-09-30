import { Link } from "react-router-dom";
import featuredCorvette from "@/assets/featured-corvette.jpg";

interface SoldVehicle {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
}

const recentlySoldVehicles: SoldVehicle[] = [
  {
    id: "sold-1",
    title: "853whp 2019 Chevrolet Corvette Z06 2LZ",
    price: "$88,900",
    location: "Massachusetts",
    image: featuredCorvette,
  },
];

const RecentlySold = () => {
  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-24 space-y-4">
        <h3 className="text-xs font-medium text-muted-foreground tracking-wider border-b-2 border-tag-sold inline-block pb-1">
          RECENTLY SOLD
        </h3>

        <div className="space-y-4">
          {recentlySoldVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/listing/${vehicle.id}`}
              className="block bg-card rounded-xl overflow-hidden border border-border card-hover"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold">
                  STREET CAR MARKET
                </div>
              </div>
              <div className="p-3 space-y-2">
                <h4 className="font-medium text-sm text-foreground line-clamp-2">
                  {vehicle.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {vehicle.price} - {vehicle.location}
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    #Street Cars
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-tag-sold/20 text-tag-sold">
                    #Sold
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RecentlySold;
