import * as dotenv from "dotenv";
import express from "express";
import WalletDomainErrorHandler from "./infrastructure/middleware/DomainErrorHandler.js";
import InMemoryWalletRepo from "./infrastructure/repositories/InMemoryWalletRepo.js";

import registerRoutes from "./infrastructure/routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(registerRoutes(new InMemoryWalletRepo()));

app.use(WalletDomainErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
