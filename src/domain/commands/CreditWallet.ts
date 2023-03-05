import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState, TransactionType } from "../model/WalletState.js";

export default async (
  walletID: string,
  amount: number,
  transactionID: string,
  walletRepository: IWalletRepository
): Promise<WalletState> => {
  if (amount < 0) {
    return Promise.reject({
      message: "Amount cannot be negative",
      status: 400,
    });
  }
  // tried without try catch block, no success, the wallet.transactionID == transactionID check caused some problems.
  try {
    const wallet: WalletState = await walletRepository.getWalletByID(walletID);
    if (wallet.transactionID == transactionID) {
      return Promise.reject({
        message: "Transaction already exists",
        status: 202,
      });
    }

    const newWalletState: WalletState = {
      walletID: walletID,
      amount: amount,
      transactionID: transactionID,
      transactionType: TransactionType.CREDIT,
      balance: wallet.balance + amount,
      version: wallet.version + 1,
    };

    walletRepository.saveWalletState(newWalletState);
    return Promise.resolve(newWalletState);
  } catch {
    const newWalletState: WalletState = {
      walletID: walletID,
      amount: amount,
      transactionID: transactionID,
      transactionType: TransactionType.CREDIT,
      balance: amount,
      version: 1,
    };
    walletRepository.saveWalletState(newWalletState);
    return Promise.resolve(newWalletState);
  }
};
