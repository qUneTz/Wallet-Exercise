import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState, TransactionType } from "../model/WalletState.js";

export default async function (
  walletID: string,
  amount: number,
  transactionID: string,
  walletRepository: IWalletRepository
): Promise<WalletState> {
  if (amount < 0) {
    return Promise.reject({
      message: "Amount cannot be negative",
      status: 400,
    });
  }
  // tried without try catch block, no success, the wallet.transactionID == transactionID check caused some problems.
  try {
    const wallet = await walletRepository.getWalletByID(walletID);
    if (wallet.transactionID == transactionID) {
      return Promise.reject({
        message: "Transaction already exists",
        status: 202,
      });
    }

    const newWalletState = new WalletState(
      walletID,
      amount,
      transactionID,
      TransactionType.CREDIT,
      wallet.balance + amount,
      wallet.version + 1
    );

    walletRepository.saveWalletState(newWalletState);
    return Promise.resolve(newWalletState);
  } catch {
    const newWalletState = new WalletState(
      walletID,
      amount,
      transactionID,
      TransactionType.CREDIT,
      amount,
      1
    );
    walletRepository.saveWalletState(newWalletState);
    return Promise.resolve(newWalletState);
  }
}
