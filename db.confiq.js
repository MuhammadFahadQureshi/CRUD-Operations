import mongoose from "mongoose";

const db_connection = ()=>{
    const DB_URI =
  "mongodb+srv://Fahad:fahad@cluster0.cdfy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URI);

mongoose.connection.on("connected",()=>{
    console.log("db connected")
})
mongoose.connection.on("error",(error)=>{
    console.log("failed to connect")
}
);
}

export default db_connection;