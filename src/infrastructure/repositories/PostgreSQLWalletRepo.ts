import Postgres from "pg";
import IWalletRepository from "../../domain/model/IWalletRepository.js";
import { WalletState } from "../../domain/model/WalletState.js";

export default class PostgreSQLWalletRepo implements IWalletRepository {
  private pool: Postgres.Pool;

  constructor(pool: Postgres.Pool) {
    this.pool = pool;
  }
  async getWalletByID(walletID: string): Promise<WalletState | null> {
    return await this.pool
      .query("SELECT * FROM wallet_api.wallet_events WHERE wallet_id = $1 ORDER BY version DESC LIMIT 1", [walletID])
      .then((res) => {
        if (res.rows.length == 0) {
          return Promise.resolve(null);
        } else {
          const result = res.rows[0];
          const walletState: WalletState = {
            walletID: result.wallet_id,
            amount: result.amount,
            transactionID: result.transaction_id,
            transactionType: result.transaction_type,
            balance: result.balance,
            version: result.version,
          };
          return Promise.resolve(walletState);
        }
      })
      .catch((err) => {
        console.log("GetWallet database error: ", err.message);
        throw new Error("Database error: " + err.message);
      });
  }
  async saveWalletState(wallet: WalletState): Promise<void> {
    return await this.pool
      .query(
        "INSERT INTO wallet_api.wallet_events (wallet_id, amount,transaction_id,transaction_type,balance,version) VALUES ($1,$2,$3,$4,$5,$6)",
        [wallet.walletID, wallet.amount, wallet.transactionID, wallet.transactionType, wallet.balance, wallet.version]
      )
      .then((res) => {
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("SaveWallet database error: ", err.message);
        throw new Error("Database error: " + err.message);
      });
  }
}
