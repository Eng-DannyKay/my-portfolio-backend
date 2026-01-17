import { DataSource } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";
import { env } from './env';

export const DB_Connection = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  synchronize: true,
   ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  entities: [ContactEntity],
}).initialize();