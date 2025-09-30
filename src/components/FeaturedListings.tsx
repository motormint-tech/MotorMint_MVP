import VehicleCard from "./VehicleCard";
import featuredTruck from "@/assets/featured-truck.jpg";
import featuredCamaro from "@/assets/featured-camaro.jpg";
import featuredCorvette from "@/assets/featured-corvette.jpg";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";

const categories = [
  { name: "Performance Trucks", active: false },
  { name: "Street Cars", active: false },
];

const featuredVehicles = [
  {
    id: "1",
    title: "1400whp 2023 Ford F-150 XLT 4x4",
    price: "$105,000",
    location: "Addison, TX",
    image: featuredTruck,
    tags: [
      { name: "Performance Trucks", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
  {
    id: "2",
    title: "737whp 2014 Chevrolet Camaro SS 1LE",
    price: "$38,999",
    location: "Davie, FL",
    image: featuredCamaro,
    tags: [
      { name: "Street Cars", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
  {
    id: "3",
    title: "853whp 2019 Chevrolet Corvette Z06 2LZ",
    price: "$88,900",
    location: "Massachusetts",
    image: featuredCorvette,
    tags: [
      { name: "Street Cars", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
  {
    id: "4",
    title: "1640awhp 2015 Nissan GT-R Black Edition",
    price: "$155,000",
    location: "Orlando, FL",
    image: heroCar1,
    tags: [
      { name: "Street Cars", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
  {
    id: "5",
    title: "2800+whp 2017 Nissan GT-R Premium",
    price: "$325,000",
    location: "Palm Harbor, FL",
    image: heroCar2,
    tags: [
      { name: "Street Cars", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
  {
    id: "6",
    title: "651whp 2015 Cadillac CTS-V Coupe",
    price: "$51,500",
    location: "Oxnard, CA",
    image: heroCar3,
    tags: [
      { name: "Street Cars", type: "category" as const },
      { name: "Available", type: "status" as const },
    ],
  },
];

const FeaturedListings = () => {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        {/* Categories Header */}
        <div className="flex items-center gap-6 mb-4">
          <span className="text-xs font-medium text-muted-foreground tracking-wider border-b-2 border-primary pb-1">
            DIVISIONS
          </span>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-primary">#</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Header */}
        <h2 className="text-xl font-bold mb-6">FEATURED</h2>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
