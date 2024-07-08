import { Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
   fullName:{
    type:String,
    trim:true,
    required:[true,'full name is required'],
    minlength: [3, 'too short first name'],
   },
   email:{
    type:String,
    trim:true,
    required:[true, 'email required'],
    unique:[true,'email is already registered'],
    minlength:1
    },
   phone:{
    type:String,
    trim:true,
    required:[true,'phone is required'],
    minlength: [13, 'too short phone number'],
   },
    password:{
        type:String,
        required:true,
        minlength: [5, 'too short user password']
    },
    idDocument:String,
    verified:{
        type:Boolean,
        default:false
    },
    changePasswordAt:Date,
    isActive:{
        type:Boolean,
        default:false
    },
    loggedOutAt:Date,
    ressetCode:{
        type:String,
    },
    ressetCodeAt:Date,
    otp:String,
    otpAt:Date,
    deleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})
userSchema.pre("save", function   ()  {
    this.password = bcrypt.hashSync(this.password,7)
})
export const userModel = model('user',userSchema)