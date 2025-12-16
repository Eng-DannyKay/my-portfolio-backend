import { DataSource } from "typeorm";
import { logger } from "../utils/logger";
import { env } from './env';
import { ContactEntity } from "../entities/contact.entity";

export const DB_Connection = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  synchronize: true,
   ssl: false,
  entities: [ContactEntity],
});

DB_Connection.initialize()
  .then(() => {
    logger.info("Data Source has been initialized!");
  })
  .catch((error) => {
    logger.info("Error during Data Source initialization:", error);
  });
