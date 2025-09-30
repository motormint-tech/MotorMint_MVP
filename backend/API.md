# MotorMint Backend API

Blockchain-native car marketplace backend with Web3 integration.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (requires auth)

### Wallet (Web3)
- `GET /api/wallet/nonce/:address` - Get nonce for wallet signature
- `POST /api/wallet/verify` - Verify wallet signature (requires auth)
- `GET /api/wallet/session/:address` - Get wallet session
- `DELETE /api/wallet/disconnect/:address` - Disconnect wallet (requires auth)
- `GET /api/wallet/user` - Get user's connected wallets (requires auth)
- `POST /api/wallet/network/:address` - Switch network (requires auth)
- `GET /api/wallet/mock` - Generate mock wallet (testing)

### Blockchain
- `GET /api/blockchain/networks` - Get supported networks
- `GET /api/blockchain/networks/:chainId` - Get network info
- `GET /api/blockchain/gas` - Get gas estimates
- `GET /api/blockchain/prices` - Get token prices (ETH, MOTO, USDC)
- `GET /api/blockchain/vehicles/:vehicleId` - Get vehicle blockchain data
- `GET /api/blockchain/vehicles/:vehicleId/drivechain` - Get DriveChain identity
- `POST /api/blockchain/vehicles/register` - Register vehicle on-chain (requires auth)
- `POST /api/blockchain/vehicles/:vehicleId/transfer` - Transfer ownership (requires auth)
- `POST /api/blockchain/vehicles/:vehicleId/maintenance` - Update maintenance log (requires auth)
- `POST /api/blockchain/vehicles/:vehicleId/verify` - Verify vehicle (requires auth)
- `GET /api/blockchain/transactions/:txHash` - Get transaction details
- `GET /api/blockchain/address/:address/transactions` - Get address transactions
- `GET /api/blockchain/escrows/:escrowId` - Get escrow details
- `GET /api/blockchain/address/:address/escrows` - Get user escrows
- `POST /api/blockchain/escrows` - Create escrow (requires auth)
- `POST /api/blockchain/escrows/:escrowId/release` - Release escrow (requires auth)
- `POST /api/blockchain/escrows/:escrowId/cancel` - Cancel escrow (requires auth)
- `POST /api/blockchain/escrows/:escrowId/dispute` - Dispute escrow (requires auth)

### Marketplace
- `GET /api/marketplace/listings` - Get marketplace listings (with filters)
- `GET /api/marketplace/listings/:listingId` - Get listing details
- `POST /api/marketplace/listings` - Create listing (requires auth)
- `PATCH /api/marketplace/listings/:listingId/price` - Update listing price (requires auth)
- `PATCH /api/marketplace/listings/:listingId/status` - Update listing status (requires auth)
- `DELETE /api/marketplace/listings/:listingId` - Remove listing (requires auth)
- `GET /api/marketplace/stats` - Get marketplace statistics
- `GET /api/marketplace/transactions` - Get recent transactions

### Cars (Vehicle Data)
- `GET /api/cars` - List all cars
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (admin)
- `PUT /api/cars/:id` - Update car (admin)
- `DELETE /api/cars/:id` - Delete car (admin)

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:id` - Get category
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Stats (Vehicle Performance)
- `GET /api/stats/:carId` - Get car stats
- `POST /api/stats` - Create stats (admin)
- `PUT /api/stats/:carId` - Update stats (admin)
- `DELETE /api/stats/:carId` - Delete stats (admin)

### Favorites
- `GET /api/favorites` - Get user favorites (requires auth)
- `POST /api/favorites` - Add to favorites (requires auth)
- `DELETE /api/favorites/:carId` - Remove from favorites (requires auth)

### Health
- `GET /health` - API health check

## Blockchain Types

### EscrowStatus
- `PENDING` - Escrow created, awaiting funds
- `ACTIVE` - Funds deposited, conditions being met
- `COMPLETED` - Conditions met, funds released
- `CANCELLED` - Escrow cancelled, funds returned
- `DISPUTED` - Under dispute resolution

### OwnershipStatus
- `REGISTERED` - Vehicle registered on-chain
- `TRANSFERRED` - Ownership recently transferred
- `LOCKED` - Ownership locked (e.g., loan collateral)
- `IN_ESCROW` - Currently in escrow transaction

### TransactionTypes
- `REGISTRATION` - Vehicle registration on-chain
- `TRANSFER` - Ownership transfer
- `ESCROW_CREATE` - Escrow creation
- `ESCROW_RELEASE` - Escrow funds released
- `ESCROW_CANCEL` - Escrow cancelled

## Running the Server

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

See `ENV_EXAMPLE.md` for required environment variables.
