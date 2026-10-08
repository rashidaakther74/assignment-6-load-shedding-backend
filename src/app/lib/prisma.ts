import { PrismaPg } from "@prisma/adapter-pg";

import { Pool } from "pg";
import config from "../config";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const pool = new Pool({
    connectionString: config.database_url || process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });