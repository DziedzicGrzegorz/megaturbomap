import { Pool } from 'pg'
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'megaMaps',
    password: "XXXXXXXXX",
    port: 5432,
})

