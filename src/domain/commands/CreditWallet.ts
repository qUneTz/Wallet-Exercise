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

  const currentWalletState: WalletState | null =
    await walletRepository.getWalletByID(walletID);

  if (currentWalletState == null) {
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
  } else {
    if (currentWalletState.transactionID == transactionID) {
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
      balance: currentWalletState.balance + amount,
      version: currentWalletState.version + 1,
    };

    walletRepository.saveWalletState(newWalletState);
    return Promise.resolve(newWalletState);
  }
};
