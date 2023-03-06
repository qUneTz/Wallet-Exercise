import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {
  WalletNotFoundError,
  InsufficientBalance,
  InvalidAmountError,
  TransactionAlreadyAcceptedError,
} from "../../domain/WalletErrors.js";
import { HTTP_Responses } from "../routes/HTTP_Responses.js";

// Polymorpism dosen't work here, that would mean that the error codes would need to be setted in the domain
export default (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof WalletNotFoundError) {
    return res.status(HTTP_Responses.NOT_FOUND.status).json({ message: "Wallet not found" });
  } else if (err instanceof InsufficientBalance) {
    return res.status(HTTP_Responses.BAD_REQUEST.status).json({ message: "Insufficient balance" });
  } else if (err instanceof InvalidAmountError) {
    return res.status(HTTP_Responses.BAD_REQUEST.status).json({ message: "Invalid amount" });
  } else if (err instanceof TransactionAlreadyAcceptedError) {
    return res.status(HTTP_Responses.ACCEPTED.status).json({ message: "Transaction already accepted" });
  } else {
    console.log(err);
    return res.status(HTTP_Responses.SERVER_ERROR.status).json({ message: "Internal server error" });
  }
};
