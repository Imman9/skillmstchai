import { Request } from "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
  }
}

export interface Config {
  port: number;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName: string;
  };
}
