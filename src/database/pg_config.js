import { Client } from "pg"

const pg_conn = new Client({
    host: process.env.NEXT_PUBLIC_PG_HOST,
    port: process.env.NEXT_PUBLIC_PG_PORT,
    database: process.env.NEXT_PUBLIC_PG_DATABASE_NAME,
    user: process.env.NEXT_PUBLIC_PG_USER,
    password: process.env.NEXT_PUBLIC_PG_PASSWORD
})

await pg_conn.connect()

export default pg_conn