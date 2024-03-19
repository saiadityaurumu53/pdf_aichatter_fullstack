import {neon, neonConfig} from '@neondatabase/serverless';
import type { NeonQueryFunction } from "@neondatabase/serverless";

import {drizzle} from 'drizzle-orm/neon-http';

//neon function to connect to the data base
//neonConfig

neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL){
    throw new Error('database url not found')
}

//const sql = neon(process.env.DATABASE_URL);
const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL);


export const db = drizzle(sql);