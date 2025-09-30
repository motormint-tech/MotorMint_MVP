import { BlockchainService } from './blockchain.service';
import { CarService } from './car.service';
import { NotFoundError } from '../utils/errors';
import { getCache, setCache } from '../utils/cache';

export interface MarketplaceListing {
  id: string;
  vehicleId: string;
  brand: string;
  model: string;
  year: number;
  priceUsd: number;
  priceEth: string;
  priceMoto: string;
  sellerAddress: string;
  sellerAddressShort: string;
  status: 'LISTED' | 'IN_ESCROW' | 'SOLD' | 'UNLISTED';
  isOnChainVerified: boolean;
  hasActiveEscrow: boolean;
  escrowStatus?: string;
  driveChainHealthScore?: number;
  imageUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceStats {
  totalListings: number;
  activeEscrows: number;
  totalVolume: string;
  volumeChange24h: number;
  averagePrice: number;
  floorPrice: number;
}

// In-memory marketplace listings
const listings: Map<string, MarketplaceListing> = new Map();

export class MarketplaceService {
  private blockchainService = new BlockchainService();
  private carService = new CarService();

  async getListings(filters: {
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    brand?: string;
    status?: string;
    hasEscrow?: boolean;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ listings: MarketplaceListing[]; total: number }> {
    let filtered = Array.from(listings.values());

    if (filters.minPrice) {
      filtered = filtered.filter((l) => l.priceUsd >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((l) => l.priceUsd <= filters.maxPrice!);
    }
    if (filters.minYear) {
      filtered = filtered.filter((l) => l.year >= filters.minYear!);
    }
    if (filters.maxYear) {
      filtered = filtered.filter((l) => l.year <= filters.maxYear!);
    }
    if (filters.brand) {
      filtered = filtered.filter((l) =>
        l.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter((l) => l.status === filters.status);
    }
    if (filters.hasEscrow !== undefined) {
      filtered = filtered.filter((l) => l.hasActiveEscrow === filters.hasEscrow);
    }
    if (filters.isVerified !== undefined) {
      filtered = filtered.filter((l) => l.isOnChainVerified === filters.isVerified);
    }

    const total = filtered.length;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const paginated = filtered.slice(skip, skip + limit);

    return { listings: paginated, total };
  }

  async getListing(listingId: string): Promise<MarketplaceListing> {
    const listing = listings.get(listingId);
    if (!listing) {
      throw new NotFoundError('Listing not found');
    }

    // Refresh blockchain data
    const blockchainData = await this.blockchainService.getVehicleBlockchainData(listing.vehicleId);
    if (blockchainData.driveChainIdentity) {
      listing.driveChainHealthScore = blockchainData.driveChainIdentity.healthScore;
    }
    if (blockchainData.activeEscrow) {
      listing.hasActiveEscrow = true;
      listing.escrowStatus = blockchainData.activeEscrow.status;
    }

    return listing;
  }

  async createListing(data: {
    vehicleId: string;
    priceUsd: number;
    sellerAddress: string;
    imageUrl?: string;
    description?: string;
  }): Promise<MarketplaceListing> {
    // Get vehicle data
    const car = await this.carService.getCarById(data.vehicleId);

    // Get blockchain data
    const blockchainData = await this.blockchainService.getVehicleBlockchainData(data.vehicleId);

    // Calculate crypto prices (mock exchange rates)
    const ethPrice = 3245.67;
    const motoPrice = 2.45;
    const priceEth = (data.priceUsd / ethPrice).toFixed(4);
    const priceMoto = (data.priceUsd / motoPrice).toFixed(2);

    const listing: MarketplaceListing = {
      id: `listing_${Date.now()}`,
      vehicleId: data.vehicleId,
      brand: car.brand,
      model: car.model,
      year: car.year,
      priceUsd: data.priceUsd,
      priceEth,
      priceMoto,
      sellerAddress: data.sellerAddress,
      sellerAddressShort: `${data.sellerAddress.slice(0, 6)}...${data.sellerAddress.slice(-4)}`,
      status: 'LISTED',
      isOnChainVerified: !!blockchainData.record,
      hasActiveEscrow: !!blockchainData.activeEscrow,
      escrowStatus: blockchainData.activeEscrow?.status,
      driveChainHealthScore: blockchainData.driveChainIdentity?.healthScore,
      imageUrl: data.imageUrl || car.imageUrl,
      description: data.description || car.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    listings.set(listing.id, listing);
    return listing;
  }

  async updateListingPrice(
    listingId: string,
    priceUsd: number
  ): Promise<MarketplaceListing> {
    const listing = listings.get(listingId);
    if (!listing) {
      throw new NotFoundError('Listing not found');
    }

    const ethPrice = 3245.67;
    const motoPrice = 2.45;

    listing.priceUsd = priceUsd;
    listing.priceEth = (priceUsd / ethPrice).toFixed(4);
    listing.priceMoto = (priceUsd / motoPrice).toFixed(2);
    listing.updatedAt = new Date();

    listings.set(listingId, listing);
    return listing;
  }

  async updateListingStatus(
    listingId: string,
    status: MarketplaceListing['status']
  ): Promise<MarketplaceListing> {
    const listing = listings.get(listingId);
    if (!listing) {
      throw new NotFoundError('Listing not found');
    }

    listing.status = status;
    listing.updatedAt = new Date();

    listings.set(listingId, listing);
    return listing;
  }

  async removeListing(listingId: string): Promise<void> {
    if (!listings.has(listingId)) {
      throw new NotFoundError('Listing not found');
    }
    listings.delete(listingId);
  }

  async getMarketplaceStats(): Promise<MarketplaceStats> {
    const cacheKey = 'marketplace:stats';
    const cached = await getCache<MarketplaceStats>(cacheKey);
    if (cached) return cached;

    const allListings = Array.from(listings.values());
    const activeListings = allListings.filter((l) => l.status === 'LISTED');

    const totalVolume = activeListings.reduce((sum, l) => sum + l.priceUsd, 0);
    const prices = activeListings.map((l) => l.priceUsd).sort((a, b) => a - b);

    const stats: MarketplaceStats = {
      totalListings: activeListings.length,
      activeEscrows: allListings.filter((l) => l.hasActiveEscrow).length,
      totalVolume: totalVolume.toFixed(2),
      volumeChange24h: (Math.random() - 0.5) * 20,
      averagePrice: prices.length > 0 ? totalVolume / prices.length : 0,
      floorPrice: prices[0] || 0,
    };

    await setCache(cacheKey, stats, 60);
    return stats;
  }

  async getRecentTransactions(limit: number = 10): Promise<
    {
      id: string;
      vehicleName: string;
      price: string;
      from: string;
      to: string;
      txHash: string;
      timestamp: Date;
    }[]
  > {
    // Simulated recent transactions
    const mockTransactions = Array.from({ length: limit }, (_, i) => ({
      id: `tx_${Date.now() - i * 100000}`,
      vehicleName: ['Tesla Model S', 'BMW M4', 'Porsche 911', 'Ferrari F8', 'Lamborghini Huracán'][
        i % 5
      ],
      price: `${(Math.random() * 100 + 10).toFixed(2)} ETH`,
      from: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
      to: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      timestamp: new Date(Date.now() - i * 3600000),
    }));

    return mockTransactions;
  }
}

