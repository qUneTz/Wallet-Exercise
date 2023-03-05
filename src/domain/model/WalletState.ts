export enum TransactionType {
  DEBIT,
  CREDIT,
}

export type WalletState = {
  walletID: string;
  amount: number;
  transactionID: string;
  transactionType: TransactionType;
  balance: number;
  version: number;
};
