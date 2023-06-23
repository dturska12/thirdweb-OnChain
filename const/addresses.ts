/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const PLATFORM_CONTRACT = "0x6c07B817c489cEDfcA17012cf07D8db121E9537A";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0xFfd9bAddF3f6e427EfAa1A4AEC99131078C1d683";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com";