import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState } from "../model/WalletState.js";

class GetWallet {
  private walletRepository: IWalletRepository;

  constructor(walletRepository: IWalletRepository) {
    this.walletRepository = walletRepository;
  }

  async getWallet(id: string): Promise<WalletState> {
    const wallet = await this.walletRepository.getWalletByID(id);
    return wallet;
  }
}
export default GetWallet;
