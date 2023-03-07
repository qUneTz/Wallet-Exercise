import * as dotenv from "dotenv";
import Postgres from "pg";

dotenv.config();

export default () => {
  return new Postgres.Pool({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.POSTGRESQL_PASSWORD,
    port: parseInt(process.env.POSTGRESQL_PORT || "5432"),
  });
};
