import express, { Request, Response } from "express";
import InMemoryWalletRepo from "../repositories/InMemoryWalletRepo.js";

import GetWallet from "../../domain/queries/GetWallet.js";
import CreditWallet from "../../domain/commands/CreditWallet.js";
import DebitWallet from "../../domain/commands/DebitWallet.js";

const walletRepository = new InMemoryWalletRepo();
const walletQuery: GetWallet = new GetWallet(walletRepository);

// add checks for request data (params))

const router = express.Router();

router.get("/wallets/:walletid", async (req: Request, res: Response) => {
  const walletID = req.params["wallet-id"];
  // if wallet not found, return 404
  // if wallet found, return wallet (latest transation id, version, coins), return 200(OK)
  await walletQuery
    .getWallet(walletID)
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

    // if wallet not found, create wallet, 202(Created)
    // if wallet found, [[update???]] and return the updated balance, 202(Created)
    // if wallet found, but transactionId [[exists???]] in wallet, just return the balance without changing it, 201(Accepted)
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

  // if wallet not found, return 404
  // if wallet found, but balance is less than coins, return 400(Bad Request)
  // if wallet found, [[update???]] and return the updated balance, 202(Created)
  // if wallet found, but transactionId [[exists???]] in wallet, just return the balance without changing it, 201(Accepted)
});

export default router;
