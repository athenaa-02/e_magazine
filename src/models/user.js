import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const {String, Number} = Schema.Types;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true 
    },

    id:{
        type:String,
        requeired:true,
        default: uuidv4,
        unique: true
    }
})

const User = model('User', userSchema)

export default User;