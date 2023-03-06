import express from "express";
import IWalletRepository from "../../domain/model/IWalletRepository";
import asyncHandler from "./handlers/asyncHandler.js";
import { getWalletHandler, creditWalletHandler, debitWalletHandler } from "./handlers/walletHandlers.js";

export default (repository: IWalletRepository) => {
  const router = express.Router();
  router.get("/wallets/:walletid", asyncHandler(getWalletHandler(repository)));
  router.post("/wallets/:walletid/credit", asyncHandler(creditWalletHandler(repository)));
  router.post("/wallets/:walletid/debit", asyncHandler(debitWalletHandler(repository)));
  return router;
};
