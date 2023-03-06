export class WalletNotFoundError extends Error {
  name = "WalletNotFoundError";
}
export class InsufficientBalance extends Error {
  name = "InsufficientBalance";
}
export class InvalidAmountError extends Error {
  name = "InvalidAmountError";
}
export class TransactionAlreadyAcceptedError extends Error {
  name = "TransactionAlreadyAcceptedError";
}
