import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export const SCROLL_NETWORK = {
//   chainId: 534352, // decimal
//   rpcUrl: "https://rpc.scroll.io/",
// };

// let provider: ethers.BrowserProvider | null = null;

// export async function connectWalletConnect() {
//   const wcProvider = await EthereumProvider.init({
//     projectId: "fec2129c245c0e725ea18002bcb1f99b", // from cloud.walletconnect.com
//     chains: [SCROLL_NETWORK.chainId],
//     showQrModal: false,
//     rpcMap: {
//       [SCROLL_NETWORK.chainId]: SCROLL_NETWORK.rpcUrl,
//     },
//   });

//   // enable session
//   await wcProvider.enable();

//   // wrap with ethers provider
//   provider = new ethers.BrowserProvider(wcProvider as any);
//   const signer = await provider.getSigner();
//   const address = await signer.getAddress();
//   return { provider, signer, address };
// }

// export function getProvider() {
//   if (!provider) throw new Error("Wallet not connected");
//   return provider;
// }
