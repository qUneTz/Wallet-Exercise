import { WalletState } from "./WalletState.js";

export default interface IWalletRepository {
  getWalletByID(id: string): Promise<WalletState | null>;
  saveWalletState(wallet: WalletState): Promise<void>;
}
