import type {Config} from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({path: ".env"});
//this is gonna load all the variables in the dot env file into the current drizzle.config.ts file


export default {
    driver: 'pg',
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config


//npx drizzle-kit push:pg
//this makes sure that the schema is pushed into the drizzle

//Note the next js doesn't give or provide the process.env folder here at the config level but it is only avaialable inside the app directory



