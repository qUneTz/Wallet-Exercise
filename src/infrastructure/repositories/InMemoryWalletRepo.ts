import IWalletRepository from "../../domain/model/IWalletRepository.js";
import { WalletState } from "../../domain/model/WalletState.js";

export default class InMemoryWalletRepo implements IWalletRepository {
  private _walletTransactions: Map<string, WalletState[]> = new Map();

  getWalletByID(walletID: string): Promise<WalletState | null> {
    if (this._walletTransactions.get(walletID) != undefined) {
      const walletTransactions = this._walletTransactions.get(walletID);
      if (walletTransactions?.length) {
        return Promise.resolve(
          walletTransactions[walletTransactions.length - 1] as WalletState
        );
      }
    }
    return Promise.resolve(null);
  }
  saveWalletState(wallet: WalletState): Promise<void> {
    const walletTransactions = this._walletTransactions.get(wallet.walletID);
    if (walletTransactions != undefined) {
      walletTransactions.push(wallet);
      this._walletTransactions.set(wallet.walletID, walletTransactions);
    } else {
      this._walletTransactions.set(wallet.walletID, [wallet]);
    }
    return Promise.resolve();
  }
}
