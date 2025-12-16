import dotenv from 'dotenv';

dotenv.config();

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const env = {
  db: {
    host: required(process.env.DB_HOST, 'DB_HOST'),
    username: required(process.env.DB_USER, 'DB_USER'),
    password: required(process.env.DB_PASSWORD, 'DB_PASSWORD'),
    name: required(process.env.DB_NAME, 'DB_NAME'),
    port: Number(process.env.DB_PORT ?? 5432),
  },
};
