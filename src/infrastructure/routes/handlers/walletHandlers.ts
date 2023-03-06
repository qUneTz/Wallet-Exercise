import { Request, Response } from "express";

import GetWallet from "../../../domain/queries/GetWallet.js";
import CreditWallet from "../../../domain/commands/CreditWallet.js";
import DebitWallet from "../../../domain/commands/DebitWallet.js";

import IWalletRepository from "../../../domain/model/IWalletRepository.js";

import { HTTP_Responses } from "../HTTP_Responses.js";

export const getWalletHandler = (walletRepository: IWalletRepository) => async (req: Request, res: Response) => {
  const walletID = req.params["walletid"];
  await GetWallet(walletID, walletRepository).then((wallet) => {
    return res.status(HTTP_Responses.OK.status).json({
      transactionId: wallet.transactionID,
      version: wallet.version,
      coins: wallet.balance,
    });
  });
};

export const creditWalletHandler = (walletRepository: IWalletRepository) => async (req: Request, res: Response) => {
  const walletID = req.params["walletid"];
  const transactionID = req.body.transactionId;
  const coins = req.body.coins;

  if (transactionID == undefined || coins == undefined) {
    return res.status(HTTP_Responses.BAD_REQUEST.status).json({ message: "transactionId and coins are required" });
  }

  await CreditWallet(walletID, coins, transactionID, walletRepository).then(() => {
    return res.status(HTTP_Responses.CREATED.status).json({ message: HTTP_Responses.CREATED.message });
  });
};

export const debitWalletHandler = (walletRepository: IWalletRepository) => async (req: Request, res: Response) => {
  const walletID = req.params["walletid"];
  const transactionID = req.body.transactionId;
  const coins = req.body.coins;

  if (transactionID == undefined || coins == undefined) {
    return res.status(HTTP_Responses.BAD_REQUEST.status).json({ message: "transactionId and coins are required" });
  }

  await DebitWallet(walletID, coins, transactionID, walletRepository).then(() => {
    return res.status(HTTP_Responses.CREATED.status).json({ message: HTTP_Responses.CREATED.message });
  });
};
