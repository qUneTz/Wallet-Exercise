enum TransactionType {
  DEBIT,
  CREDIT,
}

class WalletState {
  private _walletID: string;
  private _amount: number;
  private _transactionID: string;
  private _transactionType: TransactionType;
  private _balance: number;
  private _version: number;
  constructor(
    WalletID: string,
    amount: number,
    transactionID: string,
    transactionType: TransactionType,
    balance: number,
    version: number
  ) {
    this._walletID = WalletID;
    this._amount = amount;
    this._transactionID = transactionID;
    this._transactionType = transactionType;
    this._balance = balance;
    this._version = version;
  }

  get walletID(): string {
    return this._walletID;
  }
  get amount(): number {
    return this._amount;
  }
  get transactionID(): string {
    return this._transactionID;
  }
  get transactionType(): TransactionType {
    return this._transactionType;
  }
  get balance(): number {
    return this._balance;
  }
  get version(): number {
    return this._version;
  }
}

export { WalletState, TransactionType };
