import { WalletState } from "./WalletState.js";

interface IWalletRepository {
  getWalletByID(id: string): Promise<WalletState>;
  saveWalletState(wallet: WalletState): Promise<void>;
}

export default IWalletRepository;
