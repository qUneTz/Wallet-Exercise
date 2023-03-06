import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState } from "../model/WalletState.js";
import { WalletNotFoundError } from "../WalletErrors.js";

export default async (id: string, walletRepository: IWalletRepository): Promise<WalletState> => {
  const currentWalletState = await walletRepository.getWalletByID(id);
  if (currentWalletState == null) {
    return Promise.reject(new WalletNotFoundError());
  }
  return Promise.resolve(currentWalletState);
};
