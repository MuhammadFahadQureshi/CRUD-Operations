import express from "express";
import db_connection from "./db.confiq.js";
import router from "./Routers/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

db_connection();

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})


