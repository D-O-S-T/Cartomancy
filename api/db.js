import pkg from "pg"
const { Pool } = pkg;

export const db = new Pool ({
    user: 'postgres',       
    host: 'localhost',
    database: 'crud', 
    password : 'alex123',
    port: 5432
})