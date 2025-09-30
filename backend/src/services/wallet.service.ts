import { getCache, setCache, deleteCache } from '../utils/cache';
import { NotFoundError, UnauthorizedError } from '../utils/errors';

// Simulated wallet sessions (in production, this would verify signatures)
interface WalletSession {
  address: string;
  userId: string;
  chainId: number;
  connectedAt: Date;
  lastActiveAt: Date;
  nonce: string;
}

const walletSessions: Map<string, WalletSession> = new Map();
const userWallets: Map<string, string[]> = new Map(); // userId -> addresses[]

// Helper to generate nonce for signing
function generateNonce(): string {
  return `MotorMint-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export class WalletService {
  // Generate a nonce for wallet signature verification
  async getNonce(address: string): Promise<{ nonce: string; message: string }> {
    const nonce = generateNonce();
    const message = `Welcome to MotorMint!\n\nSign this message to verify your wallet ownership.\n\nNonce: ${nonce}\n\nThis signature will not trigger any blockchain transaction or cost any gas fees.`;

    // Store nonce temporarily
    await setCache(`nonce:${address.toLowerCase()}`, nonce, 300); // 5 minutes

    return { nonce, message };
  }

  // Verify wallet signature (simulated - in production use ethers.js verifyMessage)
  async verifySignature(
    address: string,
    signature: string,
    userId: string
  ): Promise<WalletSession> {
    const storedNonce = await getCache<string>(`nonce:${address.toLowerCase()}`);
    if (!storedNonce) {
      throw new UnauthorizedError('Nonce expired or invalid');
    }

    // In production, verify signature using ethers.verifyMessage
    // For now, we simulate successful verification
    const isValid = signature.startsWith('0x') && signature.length === 132;
    if (!isValid) {
      throw new UnauthorizedError('Invalid signature');
    }

    // Clear nonce after use
    await deleteCache(`nonce:${address.toLowerCase()}`);

    // Create session
    const session: WalletSession = {
      address: address.toLowerCase(),
      userId,
      chainId: 1, // Default to Ethereum Mainnet
      connectedAt: new Date(),
      lastActiveAt: new Date(),
      nonce: storedNonce,
    };

    walletSessions.set(address.toLowerCase(), session);

    // Link wallet to user
    const userAddresses = userWallets.get(userId) || [];
    if (!userAddresses.includes(address.toLowerCase())) {
      userAddresses.push(address.toLowerCase());
      userWallets.set(userId, userAddresses);
    }

    return session;
  }

  // Get wallet session
  async getSession(address: string): Promise<WalletSession | null> {
    return walletSessions.get(address.toLowerCase()) || null;
  }

  // Disconnect wallet
  async disconnect(address: string): Promise<void> {
    const session = walletSessions.get(address.toLowerCase());
    if (session) {
      // Remove from user wallets
      const userAddresses = userWallets.get(session.userId) || [];
      const filtered = userAddresses.filter((a) => a !== address.toLowerCase());
      if (filtered.length > 0) {
        userWallets.set(session.userId, filtered);
      } else {
        userWallets.delete(session.userId);
      }
    }
    walletSessions.delete(address.toLowerCase());
  }

  // Get user's connected wallets
  async getUserWallets(userId: string): Promise<string[]> {
    return userWallets.get(userId) || [];
  }

  // Switch network
  async switchNetwork(address: string, chainId: number): Promise<WalletSession> {
    const session = walletSessions.get(address.toLowerCase());
    if (!session) {
      throw new NotFoundError('Wallet not connected');
    }

    session.chainId = chainId;
    session.lastActiveAt = new Date();
    walletSessions.set(address.toLowerCase(), session);

    return session;
  }

  // Update last active timestamp
  async updateActivity(address: string): Promise<void> {
    const session = walletSessions.get(address.toLowerCase());
    if (session) {
      session.lastActiveAt = new Date();
      walletSessions.set(address.toLowerCase(), session);
    }
  }

  // Validate wallet owns a vehicle
  async validateVehicleOwnership(
    address: string,
    vehicleId: string,
    vehicleOwner: string
  ): Promise<boolean> {
    return address.toLowerCase() === vehicleOwner.toLowerCase();
  }

  // Generate mock wallet for testing
  generateMockWallet(): { address: string; privateKey: string } {
    const address =
      '0x' +
      Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const privateKey =
      '0x' +
      Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return { address, privateKey };
  }
}
