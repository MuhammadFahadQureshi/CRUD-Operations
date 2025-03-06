import mongoose from "mongoose";


const schema = new mongoose.Schema({

    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    },
    name:{
        required:true,
        type:String,
    }
})


const User = mongoose.model("User", schema);

export default User;
