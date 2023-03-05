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

  const currentWalletState = await walletRepository.getWalletByID(walletID);

  if (currentWalletState == null) {
    return Promise.reject({ message: "Wallet not found", status: 404 });
  }
  if (currentWalletState.balance < amount) {
    return Promise.reject({ message: "Insufficinet funds", status: 400 });
  }
  if (currentWalletState.transactionID == transactionID) {
    return Promise.reject({ message: "Request was accepted", status: 202 });
  }

  const newWalletState: WalletState = {
    walletID: walletID,
    amount: amount,
    transactionID: transactionID,
    transactionType: TransactionType.DEBIT,
    balance: currentWalletState.balance - amount,
    version: currentWalletState.version + 1,
  };
  await walletRepository.saveWalletState(newWalletState);

  return Promise.resolve(newWalletState);
};
