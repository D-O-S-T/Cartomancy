import express from "express";
import userRoutes from "./routes/users.js" //Importando as rotas de usuários
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors()) //Evitar conflitos de acesso rodando localmente

app.use("/", userRoutes)

app.listen(8800);
