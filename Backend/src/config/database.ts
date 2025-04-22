import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// Debug: Log environment variables
console.log('Database Configuration:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***' : 'not set'
});

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "skillsmatchai",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // For self-signed certificates; set to true in production with valid certificates
    }
  },
  logging: (msg) => {
    console.log(`[Sequelize] ${msg}`);
    if (msg.includes('error')) {
      console.log('Connection details:', {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "5432",
        username: process.env.DB_USER || "postgres",
        database: process.env.DB_NAME || "skillsmatchai"
      });
    }
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
