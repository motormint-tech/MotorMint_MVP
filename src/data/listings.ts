// Car listing data for marketplace - Web3 Enhanced
import camaroRed from "@/assets/cars/camaro-red.jpg";
import supraYellow from "@/assets/cars/supra-yellow.jpg";
import audiGreen from "@/assets/cars/audi-green.jpg";
import mustangBlue from "@/assets/cars/mustang-blue.jpg";
import porscheWhite from "@/assets/cars/porsche-white.jpg";
import gtrSilver from "@/assets/cars/gtr-silver.jpg";
import corvetteBlack from "@/assets/cars/corvette-black.jpg";
import bmwOrange from "@/assets/cars/bmw-orange.jpg";

// Also use existing assets
import featuredTruck from "@/assets/featured-truck.jpg";
import featuredCamaro from "@/assets/featured-camaro.jpg";
import featuredCorvette from "@/assets/featured-corvette.jpg";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";

export interface Listing {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  // Web3 fields
  priceEth: string;
  priceMatic: string;
  tokenId: string;
  contractAddress: string;
  vinHash: string;
  mintDate: string;
  network: string;
  // Original fields
  location: string;
  image: string;
  horsepower: string;
  year: number;
  make: string;
  model: string;
  tags: { name: string; type: "category" | "status" }[];
  featured?: boolean;
  dateAdded: string;
  // Ownership history
  ownershipHistory: {
    type: 'minted' | 'listed' | 'escrowed' | 'transferred' | 'verified';
    title: string;
    description: string;
    date: string;
    txHash?: string;
    address?: string;
  }[];
}

// Helper to generate mock blockchain data
const generateTokenId = (id: string) => `MOTO-0x${id.padStart(4, '0').toUpperCase()}${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
const generateVinHash = () => `0x${Array.from({length: 8}, () => Math.random().toString(16)[2]).join('')}...`;
const generateTxHash = () => `0x${Array.from({length: 8}, () => Math.random().toString(16)[2]).join('')}...`;

// ETH conversion rate (mock)
const ETH_RATE = 3450;
const MATIC_RATE = 0.85;

const toEth = (usd: number) => (usd / ETH_RATE).toFixed(4);
const toMatic = (usd: number) => Math.round(usd / MATIC_RATE).toLocaleString();

export const listings: Listing[] = [
  {
    id: "1",
    title: "1400whp 2023 Ford F-150 XLT 4x4",
    price: "$105,000",
    priceValue: 105000,
    priceEth: toEth(105000),
    priceMatic: toMatic(105000),
    tokenId: "MOTO-0x001A2F4C",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x8a2f...3b1c",
    mintDate: "2024-01-10",
    network: "Polygon",
    location: "Addison, TX",
    image: featuredTruck,
    horsepower: "1400whp",
    year: 2023,
    make: "Ford",
    model: "F-150",
    tags: [
      { name: "Performance Trucks", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-15",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 10, 2024', txHash: '0x8f2a...4c1d', address: '0x742d...B6a9' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 11, 2024', txHash: '0x3d7b...9e3a' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 15, 2024', txHash: '0x6c4f...2b8d' },
    ],
  },
  {
    id: "2",
    title: "850whp 2024 Chevrolet Camaro ZL1",
    price: "$89,500",
    priceValue: 89500,
    priceEth: toEth(89500),
    priceMatic: toMatic(89500),
    tokenId: "MOTO-0x002B3E5D",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x9b3e...4c2d",
    mintDate: "2024-01-18",
    network: "Polygon",
    location: "Miami, FL",
    image: camaroRed,
    horsepower: "850whp",
    year: 2024,
    make: "Chevrolet",
    model: "Camaro",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-20",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 18, 2024', txHash: '0x7a3c...5d2e', address: '0x8ba1...BA72' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 19, 2024', txHash: '0x2f5b...8c1a' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 20, 2024', txHash: '0x4e8d...1f3c' },
    ],
  },
  {
    id: "3",
    title: "720whp 2023 Toyota Supra GR",
    price: "$78,000",
    priceValue: 78000,
    priceEth: toEth(78000),
    priceMatic: toMatic(78000),
    tokenId: "MOTO-0x003C4F6E",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xWZ1D...4LW5",
    mintDate: "2024-01-12",
    network: "Polygon",
    location: "Los Angeles, CA",
    image: supraYellow,
    horsepower: "720whp",
    year: 2023,
    make: "Toyota",
    model: "Supra",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-18",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 12, 2024', txHash: '0x6b4e...3a2f', address: '0xf39F...2266' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 13, 2024', txHash: '0x5c3d...7b1e' },
      { type: 'transferred', title: 'Ownership Transferred', description: 'Previous owner transferred to current seller', date: 'Jan 15, 2024', txHash: '0x8f7a...2c4d', address: '0x742d...B6a9' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 18, 2024', txHash: '0x9e8f...4b3c' },
    ],
  },
  {
    id: "4",
    title: "650whp 2022 Audi RS5 Sportback",
    price: "$95,000",
    priceValue: 95000,
    priceEth: toEth(95000),
    priceMatic: toMatic(95000),
    tokenId: "MOTO-0x004D5G7F",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xWUAB...5NA7",
    mintDate: "2024-01-08",
    network: "Polygon",
    location: "Chicago, IL",
    image: audiGreen,
    horsepower: "650whp",
    year: 2022,
    make: "Audi",
    model: "RS5",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    dateAdded: "2024-01-12",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 8, 2024', txHash: '0x3c2d...9a1b', address: '0x8ba1...BA72' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 9, 2024', txHash: '0x7f5e...4c2d' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 12, 2024', txHash: '0x2e8a...6b3f' },
    ],
  },
  {
    id: "5",
    title: "900whp 2021 Ford Mustang GT500",
    price: "$112,000",
    priceValue: 112000,
    priceEth: toEth(112000),
    priceMatic: toMatic(112000),
    tokenId: "MOTO-0x005E6H8G",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x1FA6...5M5J",
    mintDate: "2024-01-20",
    network: "Polygon",
    location: "Dallas, TX",
    image: mustangBlue,
    horsepower: "900whp",
    year: 2021,
    make: "Ford",
    model: "Mustang",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-22",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 20, 2024', txHash: '0x9a4b...2c1d', address: '0xf39F...2266' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 21, 2024', txHash: '0x8b3c...5d2e' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 22, 2024', txHash: '0x6c2d...4e1f' },
    ],
  },
  {
    id: "6",
    title: "580whp 2023 Porsche 911 Turbo S",
    price: "$245,000",
    priceValue: 245000,
    priceEth: toEth(245000),
    priceMatic: toMatic(245000),
    tokenId: "MOTO-0x006F7I9H",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xWP0A...9PS8",
    mintDate: "2024-01-05",
    network: "Polygon",
    location: "San Diego, CA",
    image: porscheWhite,
    horsepower: "580whp",
    year: 2023,
    make: "Porsche",
    model: "911",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    dateAdded: "2024-01-10",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 5, 2024', txHash: '0x4d3e...8a2b', address: '0x742d...B6a9' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 6, 2024', txHash: '0x5e4f...9b3c' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 10, 2024', txHash: '0x7f6g...1c4d' },
    ],
  },
  {
    id: "7",
    title: "1640awhp 2020 Nissan GT-R NISMO",
    price: "$285,000",
    priceValue: 285000,
    priceEth: toEth(285000),
    priceMatic: toMatic(285000),
    tokenId: "MOTO-0x007G8J0I",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xJN1T...5Z0K",
    mintDate: "2024-01-22",
    network: "Polygon",
    location: "Orlando, FL",
    image: gtrSilver,
    horsepower: "1640awhp",
    year: 2020,
    make: "Nissan",
    model: "GT-R",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-25",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 22, 2024', txHash: '0x2a1b...6c3d', address: '0x8ba1...BA72' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 23, 2024', txHash: '0x3b2c...7d4e' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 25, 2024', txHash: '0x4c3d...8e5f' },
    ],
  },
  {
    id: "8",
    title: "853whp 2019 Chevrolet Corvette Z06",
    price: "$88,900",
    priceValue: 88900,
    priceEth: toEth(88900),
    priceMatic: toMatic(88900),
    tokenId: "MOTO-0x008H9K1J",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x1G1Y...5L6M",
    mintDate: "2024-01-02",
    network: "Polygon",
    location: "Massachusetts",
    image: corvetteBlack,
    horsepower: "853whp",
    year: 2019,
    make: "Chevrolet",
    model: "Corvette",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Sold", type: "status" },
    ],
    dateAdded: "2024-01-05",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 2, 2024', txHash: '0x5d4e...9f6g', address: '0xf39F...2266' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 3, 2024', txHash: '0x6e5f...0g7h' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 5, 2024', txHash: '0x7f6g...1h8i' },
      { type: 'escrowed', title: 'Funds Escrowed', description: 'Buyer locked funds in smart contract', date: 'Jan 20, 2024', txHash: '0x8g7h...2i9j', address: '0x742d...B6a9' },
      { type: 'transferred', title: 'Ownership Transferred', description: 'NFT transferred to buyer wallet', date: 'Jan 25, 2024', txHash: '0x9h8i...3j0k', address: '0x742d...B6a9' },
    ],
  },
  {
    id: "9",
    title: "750whp 2023 BMW M4 Competition",
    price: "$92,000",
    priceValue: 92000,
    priceEth: toEth(92000),
    priceMatic: toMatic(92000),
    tokenId: "MOTO-0x009I0L2K",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xWBS3...7N8O",
    mintDate: "2024-01-14",
    network: "Polygon",
    location: "Houston, TX",
    image: bmwOrange,
    horsepower: "750whp",
    year: 2023,
    make: "BMW",
    model: "M4",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    dateAdded: "2024-01-17",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 14, 2024', txHash: '0x0i9j...4k1l', address: '0x8ba1...BA72' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 15, 2024', txHash: '0x1j0k...5l2m' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 17, 2024', txHash: '0x2k1l...6m3n' },
    ],
  },
  {
    id: "10",
    title: "1200whp 2022 Dodge Challenger Hellcat",
    price: "$98,500",
    priceValue: 98500,
    priceEth: toEth(98500),
    priceMatic: toMatic(98500),
    tokenId: "MOTO-0x010J1M3L",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x2C3C...8O9P",
    mintDate: "2024-01-16",
    network: "Polygon",
    location: "Phoenix, AZ",
    image: featuredCamaro,
    horsepower: "1200whp",
    year: 2022,
    make: "Dodge",
    model: "Challenger",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    dateAdded: "2024-01-19",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 16, 2024', txHash: '0x3l2m...7n4o', address: '0xf39F...2266' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 17, 2024', txHash: '0x4m3n...8o5p' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 19, 2024', txHash: '0x5n4o...9p6q' },
    ],
  },
  {
    id: "11",
    title: "680whp 2024 Mercedes-AMG C63 S",
    price: "$125,000",
    priceValue: 125000,
    priceEth: toEth(125000),
    priceMatic: toMatic(125000),
    tokenId: "MOTO-0x011K2N4M",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0xWDD2...9Q0R",
    mintDate: "2024-01-24",
    network: "Polygon",
    location: "Atlanta, GA",
    image: heroCar1,
    horsepower: "680whp",
    year: 2024,
    make: "Mercedes-AMG",
    model: "C63 S",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Available", type: "status" },
    ],
    featured: true,
    dateAdded: "2024-01-26",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 24, 2024', txHash: '0x6o5p...0q7r', address: '0x742d...B6a9' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 25, 2024', txHash: '0x7p6q...1r8s' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 26, 2024', txHash: '0x8q7r...2s9t' },
    ],
  },
  {
    id: "12",
    title: "1100whp 2021 Chevrolet Corvette C8",
    price: "$145,000",
    priceValue: 145000,
    priceEth: toEth(145000),
    priceMatic: toMatic(145000),
    tokenId: "MOTO-0x012L3O5N",
    contractAddress: "0x7C3...9E2D",
    vinHash: "0x1G1Y...0S1T",
    mintDate: "2024-01-06",
    network: "Polygon",
    location: "Denver, CO",
    image: featuredCorvette,
    horsepower: "1100whp",
    year: 2021,
    make: "Chevrolet",
    model: "Corvette",
    tags: [
      { name: "Street Cars", type: "category" },
      { name: "Sold", type: "status" },
    ],
    dateAdded: "2024-01-08",
    ownershipHistory: [
      { type: 'minted', title: 'Vehicle Tokenized', description: 'Asset minted as NFT on Polygon', date: 'Jan 6, 2024', txHash: '0x9r8s...3t0u', address: '0x8ba1...BA72' },
      { type: 'verified', title: 'VIN Verified', description: 'Vehicle identification verified on-chain', date: 'Jan 7, 2024', txHash: '0x0s9t...4u1v' },
      { type: 'listed', title: 'Listed for Sale', description: 'Asset listed on MotorMint marketplace', date: 'Jan 8, 2024', txHash: '0x1t0u...5v2w' },
      { type: 'escrowed', title: 'Funds Escrowed', description: 'Buyer locked funds in smart contract', date: 'Jan 18, 2024', txHash: '0x2u1v...6w3x', address: '0xf39F...2266' },
      { type: 'transferred', title: 'Ownership Transferred', description: 'NFT transferred to buyer wallet', date: 'Jan 22, 2024', txHash: '0x3v2w...7x4y', address: '0xf39F...2266' },
    ],
  },
];

// Filter functions
export const getAvailableListings = () => listings.filter(l => l.tags.some(t => t.name === "Available"));
export const getSoldListings = () => listings.filter(l => l.tags.some(t => t.name === "Sold"));
export const getFeaturedListings = () => listings.filter(l => l.featured);

// Categories for filters
export const categories = [
  { id: "all", name: "All Vehicles", count: listings.length },
  { id: "street-cars", name: "Street Cars", count: listings.filter(l => l.tags.some(t => t.name === "Street Cars")).length },
  { id: "performance-trucks", name: "Performance Trucks", count: listings.filter(l => l.tags.some(t => t.name === "Performance Trucks")).length },
];

// Makes for filters
export const makes = [...new Set(listings.map(l => l.make))].sort();

// Years for filters  
export const years = [...new Set(listings.map(l => l.year))].sort((a, b) => b - a);
