import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState } from "../model/WalletState.js";

export default async (
  id: string,
  walletRepository: IWalletRepository
): Promise<WalletState> => {
  return await walletRepository.getWalletByID(id);
};
