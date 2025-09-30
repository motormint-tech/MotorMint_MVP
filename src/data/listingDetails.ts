// Extended listing details for detail pages

export interface ListingDetail {
  description: string;
  specs: { label: string; value: string }[];
  modifications: { category: string; items: string[] }[];
  features: string[];
  seller: {
    name: string;
    location: string;
    email: string;
    phone: string;
    memberSince: string;
    listingsCount: number;
  };
}

export const listingDetails: Record<string, ListingDetail> = {
  "1": {
    description: "This 2023 Ford F-150 XLT 4x4 is an absolute monster with 1400whp on tap. Built for the street and the strip, this truck has been meticulously built with only the highest quality parts. The build includes a complete engine rebuild, custom turbo kit, and reinforced drivetrain. Perfect for someone looking for the ultimate sleeper truck.",
    specs: [
      { label: "VIN", value: "1FTFW1E87PFA*****" },
      { label: "Mileage", value: "12,500 mi" },
      { label: "Drivetrain", value: "4WD" },
      { label: "Engine", value: "5.0L V8 Twin Turbo" },
      { label: "Transmission", value: "10-Speed Automatic" },
      { label: "Exterior Color", value: "Oxford White" },
      { label: "Interior Color", value: "Black" },
      { label: "Fuel Type", value: "E85/Gasoline" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Forged internals", "Custom twin turbo kit", "Upgraded fuel system", "Built transmission", "Custom tune"],
      },
      {
        category: "Suspension",
        items: ["Lowering kit", "Upgraded shocks", "Performance alignment", "Wheel spacers"],
      },
      {
        category: "Exterior",
        items: ["Custom wheels", "Performance exhaust", "Tinted windows", "LED lighting"],
      },
      {
        category: "Interior",
        items: ["Custom gauges", "Racing seats", "Roll cage", "Safety harness"],
      },
    ],
    features: ["Backup Camera", "Apple CarPlay", "Android Auto", "Navigation", "Heated Seats", "Premium Audio", "Sunroof", "Leather Seats", "Remote Start"],
    seller: {
      name: "Texas Performance",
      location: "Addison, TX",
      email: "sales@texasperformance.com",
      phone: "(214) 555-0123",
      memberSince: "2021",
      listingsCount: 12,
    },
  },
  "2": {
    description: "Stunning 2024 Chevrolet Camaro ZL1 pushing 850whp to the wheels. This beast features a comprehensive build focused on both straight-line performance and road course capability. Fresh build with less than 5,000 miles on the current setup.",
    specs: [
      { label: "VIN", value: "1G1FJ1R67R0*****" },
      { label: "Mileage", value: "8,200 mi" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Engine", value: "6.2L Supercharged V8" },
      { label: "Transmission", value: "10-Speed Automatic" },
      { label: "Exterior Color", value: "Red Hot" },
      { label: "Interior Color", value: "Jet Black" },
      { label: "Fuel Type", value: "Premium Gasoline" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Whipple 3.0L supercharger", "Upgraded injectors", "Long tube headers", "Custom tune"],
      },
      {
        category: "Drivetrain",
        items: ["Built 10-speed trans", "Upgraded torque converter", "Upgraded rear diff"],
      },
      {
        category: "Suspension",
        items: ["Coilovers", "Adjustable control arms", "Performance sway bars"],
      },
      {
        category: "Brakes",
        items: ["6-piston front calipers", "Upgraded rotors", "Performance pads"],
      },
    ],
    features: ["Performance Data Recorder", "Magnetic Ride Control", "Brembo Brakes", "Recaro Seats", "Head-Up Display", "Navigation", "Premium Bose Audio"],
    seller: {
      name: "Miami Muscle Cars",
      location: "Miami, FL",
      email: "info@miamimuscle.com",
      phone: "(305) 555-0456",
      memberSince: "2019",
      listingsCount: 28,
    },
  },
  "3": {
    description: "This 2020 Toyota GR Supra 3.0 Premium has been transformed into a 1150whp beast through an extensive engine build. The B58 engine has been fully built with forged internals, custom turbo setup, and supporting modifications. The car runs on E85 and has been professionally tuned on a Dynojet dynamometer. This build represents the pinnacle of modern JDM performance, combining Toyota reliability with world-class power output. Perfect for both street driving and track days, this Supra turns heads everywhere it goes with its aggressive widebody kit and stunning stance.",
    specs: [
      { label: "VIN", value: "WZ1DB4C04LW*****" },
      { label: "Mileage", value: "18,500 mi" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Engine", value: "3.0L B58 Twin-Scroll Turbo I6" },
      { label: "Transmission", value: "8-Speed Automatic ZF" },
      { label: "Exterior Color", value: "Phantom Matte Grey" },
      { label: "Interior Color", value: "Black Leather" },
      { label: "Fuel Type", value: "E85" },
    ],
    modifications: [
      {
        category: "Engine",
        items: [
          "Pure Turbos 900 Stage 3+ Turbo",
          "Port injection system",
          "Upgraded fuel pumps",
          "Forged pistons & rods",
          "ARP head studs",
          "Custom intercooler",
          "Downpipe & exhaust",
          "MHD/Bootmod3 custom tune",
        ],
      },
      {
        category: "Drivetrain",
        items: [
          "Upgraded clutch packs",
          "Transmission cooler",
          "Upgraded driveshaft",
          "Limited slip differential",
        ],
      },
      {
        category: "Suspension & Chassis",
        items: [
          "KW V3 Coilovers",
          "Front strut tower brace",
          "Adjustable rear arms",
          "Titan7 T-S5 wheels",
          "Beadlock wheel rings",
          "Michelin Pilot Sport 4S tires",
        ],
      },
      {
        category: "Exterior",
        items: [
          "Varis widebody kit",
          "Carbon fiber wing",
          "Carbon fiber splitter",
          "Vented hood",
          "Custom wrap",
        ],
      },
    ],
    features: [
      "Launch Control",
      "Active Differential",
      "Adaptive Suspension",
      "Premium JBL Audio",
      "Wireless Apple CarPlay",
      "Navigation System",
      "Head-Up Display",
      "Heated Leather Seats",
      "Keyless Entry",
      "Dual-Zone Climate",
      "Backup Camera",
      "Blind Spot Monitor",
    ],
    seller: {
      name: "Desert Performance",
      location: "Phoenix, AZ",
      email: "builds@desertperformance.com",
      phone: "(480) 555-0789",
      memberSince: "2020",
      listingsCount: 8,
    },
  },
  "4": {
    description: "This 2022 Audi RS5 Sportback delivers 650whp with its upgraded twin-turbo V6. The perfect blend of luxury and performance, featuring a comprehensive Stage 2+ build with supporting modifications.",
    specs: [
      { label: "VIN", value: "WUABWCF55NA*****" },
      { label: "Mileage", value: "15,200 mi" },
      { label: "Drivetrain", value: "Quattro AWD" },
      { label: "Engine", value: "2.9L Twin-Turbo V6" },
      { label: "Transmission", value: "8-Speed Tiptronic" },
      { label: "Exterior Color", value: "Sonoma Green" },
      { label: "Interior Color", value: "Black Nappa Leather" },
      { label: "Fuel Type", value: "Premium Gasoline" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Pure Stage 2 turbos", "Downpipes", "Intercooler upgrade", "Stage 2+ ECU tune"],
      },
      {
        category: "Exhaust",
        items: ["Akrapovic titanium exhaust", "Secondary cat delete"],
      },
      {
        category: "Suspension",
        items: ["H&R lowering springs", "034 Motorsport sway bars"],
      },
      {
        category: "Wheels",
        items: ["Vossen HF-5 21\"", "Michelin PS4S tires"],
      },
    ],
    features: ["Virtual Cockpit", "Bang & Olufsen Audio", "Panoramic Sunroof", "Massage Seats", "Matrix LED Headlights", "Carbon Ceramic Brakes"],
    seller: {
      name: "Chicago Euro Motors",
      location: "Chicago, IL",
      email: "info@chicagoeuro.com",
      phone: "(312) 555-0234",
      memberSince: "2018",
      listingsCount: 45,
    },
  },
  "5": {
    description: "2021 Ford Mustang GT500 with 900whp on tap. This Shelby has been built to handle serious power with a comprehensive build including forged internals and a massive supercharger upgrade.",
    specs: [
      { label: "VIN", value: "1FA6P8SJ5M5*****" },
      { label: "Mileage", value: "9,800 mi" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Engine", value: "5.2L Supercharged V8" },
      { label: "Transmission", value: "7-Speed Dual Clutch" },
      { label: "Exterior Color", value: "Velocity Blue" },
      { label: "Interior Color", value: "Ebony" },
      { label: "Fuel Type", value: "E85" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Whipple Gen 5 3.8L", "Forged internals", "ID1700 injectors", "E85 fuel system"],
      },
      {
        category: "Drivetrain",
        items: ["Upgraded clutch packs", "Built rear end", "Driveshaft upgrade"],
      },
      {
        category: "Cooling",
        items: ["Heat exchanger upgrade", "Upgraded radiator", "Oil cooler"],
      },
      {
        category: "Exhaust",
        items: ["Long tube headers", "Catless mid-pipe", "Borla exhaust"],
      },
    ],
    features: ["Recaro Seats", "Carbon Fiber Track Pack", "MagneRide", "Technology Package", "Over-The-Air Updates"],
    seller: {
      name: "Lone Star Performance",
      location: "Dallas, TX",
      email: "sales@lonestarperf.com",
      phone: "(972) 555-0567",
      memberSince: "2020",
      listingsCount: 15,
    },
  },
  "6": {
    description: "This 2023 Porsche 911 Turbo S represents the pinnacle of sports car engineering with 580whp. A true daily-driver supercar with extensive factory options.",
    specs: [
      { label: "VIN", value: "WP0AD2A99PS*****" },
      { label: "Mileage", value: "4,200 mi" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Engine", value: "3.8L Twin-Turbo Flat-6" },
      { label: "Transmission", value: "8-Speed PDK" },
      { label: "Exterior Color", value: "Carrara White" },
      { label: "Interior Color", value: "Black/Bordeaux" },
      { label: "Fuel Type", value: "Premium Gasoline" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Factory stock - 640hp", "Sport exhaust system"],
      },
      {
        category: "Exterior",
        items: ["Sport Design Package", "Carbon fiber trim"],
      },
    ],
    features: ["Sport Chrono Package", "PCCB Ceramic Brakes", "Burmester Audio", "Rear Axle Steering", "Sport Exhaust", "LED Matrix Headlights"],
    seller: {
      name: "Coastal Exotics",
      location: "San Diego, CA",
      email: "sales@coastalexotics.com",
      phone: "(619) 555-0890",
      memberSince: "2017",
      listingsCount: 62,
    },
  },
  "7": {
    description: "This 2020 Nissan GT-R NISMO is an absolute weapon with 1640awhp. Full Alpha 16 build with every supporting modification needed to handle this power reliably.",
    specs: [
      { label: "VIN", value: "JN1TBNT35Z0*****" },
      { label: "Mileage", value: "22,100 mi" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Engine", value: "3.8L Twin-Turbo V6" },
      { label: "Transmission", value: "6-Speed Dual Clutch" },
      { label: "Exterior Color", value: "Ultimate Silver" },
      { label: "Interior Color", value: "Black/Red" },
      { label: "Fuel Type", value: "E85" },
    ],
    modifications: [
      {
        category: "Engine",
        items: ["Alpha 16 turbo kit", "Billet intake", "ID2000 injectors", "Fore fuel system", "Built short block"],
      },
      {
        category: "Transmission",
        items: ["Shep Stage 4 transmission", "SSP TCM", "Dodson clutch packs"],
      },
      {
        category: "Suspension",
        items: ["Öhlins Road & Track", "Whiteline sway bars"],
      },
      {
        category: "Wheels/Brakes",
        items: ["Volk TE37 Saga", "Brembo GT-R kit"],
      },
    ],
    features: ["NISMO Aero", "Carbon Fiber Roof", "NISMO Seats", "Titanium Exhaust", "NISMO Steering Wheel"],
    seller: {
      name: "JDM Legends",
      location: "Orlando, FL",
      email: "info@jdmlegends.com",
      phone: "(407) 555-0123",
      memberSince: "2016",
      listingsCount: 89,
    },
  },
};

// Generate default details for listings not explicitly defined
export const getListingDetails = (id: string): ListingDetail => {
  if (listingDetails[id]) {
    return listingDetails[id];
  }
  
  return {
    description: "This vehicle represents exceptional value in the performance car market. Well-maintained with documented service history and quality modifications.",
    specs: [
      { label: "VIN", value: "Contact for VIN" },
      { label: "Mileage", value: "Contact seller" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Transmission", value: "Automatic" },
      { label: "Exterior Color", value: "See photos" },
      { label: "Interior Color", value: "See photos" },
    ],
    modifications: [
      {
        category: "Performance",
        items: ["Contact seller for modification list"],
      },
    ],
    features: ["Contact seller for complete feature list"],
    seller: {
      name: "MotorMint Seller",
      location: "USA",
      email: "seller@motormint.com",
      phone: "(555) 123-4567",
      memberSince: "2024",
      listingsCount: 1,
    },
  };
};
