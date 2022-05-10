import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.SERVER_PORT
  },

  storage: {
    basePath: process.env.STORAGE_BASE_PATH,
  },

  jwt: {
    token: process.env.JWT_TOKEN
  }
}
