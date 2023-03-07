import * as dotenv from "dotenv";
import express from "express";

import WalletDomainErrorHandler from "./infrastructure/middleware/WalletErrorHandler.js";

import PostgreSQLWalletRepo from "./infrastructure/repositories/PostgreSQLWalletRepo.js";

import postgresPool from "./infrastructure/db/PostgresPool.js";

import registerRoutes from "./infrastructure/routes/routes.js";

dotenv.config();

// to be changed: find a solution to easily switch between postgres and in-memory repos

const PORT = process.env.PORT || 3000;
const pool = postgresPool();

const app = express();

app.use(express.json());
app.use(registerRoutes(new PostgreSQLWalletRepo(pool)));

app.use(WalletDomainErrorHandler);

console.log("Connecting to PostgreSQL...");
pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to PostgreSQL");
    throw new Error(err.message);
  });
