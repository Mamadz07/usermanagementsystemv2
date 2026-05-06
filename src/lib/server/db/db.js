import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema';


export function createDb(env) {
    if (!env.DATABASE_URL) throw new Error("DATABASE_URL missing");
    if (!env.DATABASE_AUTH_TOKEN) throw new Error("DATABASE_AUTH_TOKEN missing");

const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
});

return drizzle(client, {schema});

}