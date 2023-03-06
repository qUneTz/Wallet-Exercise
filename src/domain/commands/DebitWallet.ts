import IWalletRepository from "../model/IWalletRepository.js";
import { WalletState, TransactionType } from "../model/WalletState.js";
import {
  WalletNotFoundError,
  InsufficientBalance,
  InvalidAmountError,
  TransactionAlreadyAcceptedError,
} from "../WalletErrors.js";

export default async (
  walletID: string,
  amount: number,
  transactionID: string,
  walletRepository: IWalletRepository
): Promise<WalletState> => {
  const currentWalletState = await walletRepository.getWalletByID(walletID);

  if (amount < 0) {
    return Promise.reject(new InvalidAmountError());
  }
  if (currentWalletState == null) {
    return Promise.reject(new WalletNotFoundError());
  }
  if (currentWalletState.balance < amount) {
    return Promise.reject(new InsufficientBalance());
  }
  if (currentWalletState.transactionID == transactionID) {
    return Promise.reject(new TransactionAlreadyAcceptedError());
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
