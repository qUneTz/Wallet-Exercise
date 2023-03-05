import express, { Request, Response } from "express";
import InMemoryWalletRepo from "../repositories/InMemoryWalletRepo.js";

import GetWallet from "../../domain/queries/GetWallet.js";
import CreditWallet from "../../domain/commands/CreditWallet.js";
import DebitWallet from "../../domain/commands/DebitWallet.js";

const walletRepository = new InMemoryWalletRepo();

// add checks for request data (params))

const router = express.Router();

router.get("/wallets/:walletid", async (req: Request, res: Response) => {
  const walletID = req.params["wallet-id"];
  await GetWallet(walletID, walletRepository)
    .then((wallet) => {
      return res.status(200).json({
        transactionId: wallet.transactionID,
        version: wallet.version,
        coins: wallet.balance,
      });
    })
    .catch((e) => {
      return res.status(e.status).json({ message: e.message });
    });
});
router.post(
  "/wallets/:walletid/credit",
  async (req: Request, res: Response) => {
    const walletID = req.params["wallet-id"];
    const transactionID = req.body.transactionId;
    const coins = req.body.coins;
    transactionID;
    await CreditWallet(walletID, coins, transactionID, walletRepository)
      .then(() => {
        return res.status(201).json({ message: "Created" });
      })
      .catch((e) => {
        return res.status(e.status).json({ message: e.message });
      });
  }
);
router.post("/wallets/:walletid/debit", async (req: Request, res: Response) => {
  const walletID = req.params["wallet-id"];
  const transactionID = req.body.transactionId;
  const coins = req.body.coins;

  await DebitWallet(walletID, coins, transactionID, walletRepository)
    .then(() => {
      return res.status(201).json({ message: "Created" });
    })
    .catch((e) => {
      return res.status(e.status).json({ message: e.message });
    });
});

export default router;
