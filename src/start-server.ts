import * as dotenv from "dotenv";
import express from "express";

import WalletDomainErrorHandler from "./infrastructure/middleware/WalletErrorHandler.js";

import PostgreSQLWalletRepo from "./infrastructure/repositories/PostgreSQLWalletRepo.js";
import InMemoryWalletRepo from "./infrastructure/repositories/InMemoryWalletRepo.js";

import postgresPool from "./infrastructure/db/PostgresPool.js";

import registerRoutes from "./infrastructure/routes/routes.js";

export default (inMemoryRepository: boolean) => {
  dotenv.config();

  const PORT = process.env.PORT || 3000;

  const app = express();

  app.use(express.json());

  if (inMemoryRepository == true) {
    app.use(registerRoutes(new InMemoryWalletRepo()));

    console.log("Using in-memory repository...");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } else {
    const pool = postgresPool();
    app.use(registerRoutes(new PostgreSQLWalletRepo(pool)));
    console.log("Connecting to PostgreSQL...");
    pool
      .connect()
      .then(() => {
        console.log("Connected to PostgreSQL successfully");
        app.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.log("Error connecting to PostgreSQL");
        throw new Error(err.message);
      });
  }
  app.use(WalletDomainErrorHandler);
};
