import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState } from "../model/WalletState.js";

export default async (
  id: string,
  walletRepository: IWalletRepository
): Promise<WalletState> => {
  const currentWalletState = await walletRepository.getWalletByID(id);
  if (currentWalletState == null) {
    return Promise.reject({ message: "Wallet not found", status: 404 });
  }
  return Promise.resolve(currentWalletState);
};
