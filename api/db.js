import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : "alex123",
  database: "crud"
})