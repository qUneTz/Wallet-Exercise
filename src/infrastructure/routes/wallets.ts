import express, { Request, Response } from "express";

const router = express.Router();

console.log("a");

router.get("/wallets/:walletid", (req: Request, res: Response) => {
  const walletId = req.params["walletid"];
  // if wallet not found, return 404
  // if wallet found, return wallet (latest transation id, version, coins), return 200(OK)
  throw new Error("Not implemented");
});
router.post("/wallets/:walletid/credit", (req: Request, res: Response) => {
  const walletId = req.params["wallet-id"];
  const transactionId = req.body.transactionId;
  const coins = req.body.coins;
  // if wallet not found, create wallet, 202(Created)
  // if wallet found, [[update???]] and return the updated balance, 202(Created)
  // if wallet found, but transactionId [[exists???]] in wallet, just return the balance without changing it, 201(Accepted)

  throw new Error("Not implemented");
});
router.post("/wallets/:walletid/debit", (req: Request, res: Response) => {
  const walletId = req.params["wallet-id"];
  const transactionId = req.body.transactionId;
  const coins = req.body.coins;
  // if wallet not found, return 404
  // if wallet found, but balance is less than coins, return 400(Bad Request)
  // if wallet found, [[update???]] and return the updated balance, 202(Created)
  // if wallet found, but transactionId [[exists???]] in wallet, just return the balance without changing it, 201(Accepted)

  throw new Error("Not implemented");
});

export default router;
