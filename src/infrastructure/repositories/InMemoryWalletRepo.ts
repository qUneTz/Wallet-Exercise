import IWalletRepository from "../../domain/model/IWalletRepository.js";
import { WalletState } from "../../domain/model/WalletState.js";

class InMemoryWalletRepo implements IWalletRepository {
  private _walletTransactions: Map<string, WalletState[]> = new Map();

  getWalletByID(walletID: string): Promise<WalletState> {
    if (this._walletTransactions.get(walletID) != undefined) {
      const walletTransactions = this._walletTransactions.get(walletID);
      if (walletTransactions?.length) {
        return Promise.resolve(
          walletTransactions[walletTransactions.length - 1] as WalletState
        );
      }
    }
    return Promise.reject({ message: "Wallet not found", status: 404 });
  }
  saveWalletState(wallet: WalletState): Promise<void> {
    const walletTransactions = this._walletTransactions.get(wallet.walletID);
    if (walletTransactions != undefined) {
      walletTransactions.push(wallet);
      this._walletTransactions.set(wallet.walletID, walletTransactions);

      return Promise.resolve();
    } else {
      this._walletTransactions.set(wallet.walletID, [wallet]);
      return Promise.resolve();
    }
  }
}
export default InMemoryWalletRepo;
