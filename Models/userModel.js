import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    f_name: {
        type:  String,
        required : [true, 'Please Enter Your First Name']
    },
    l_name: {
        type:  String,
        required : [true, 'Please Enter Your Last Name']
    },
    date: {
        type:  Number,
        required : [true, 'Please Enter The Date']
    },
    month: {
        type:  String,
        required : [true, 'Please Enter Your Month']
    },
    year: {
        type:  String,
        required : [true, 'Please Enter Your Year']
    },
    m_mail: {
        type:  String,
        required : [true, 'Please Enter Your Mail or Phone Number']
    },
    gender: {
        type:  String,
        required : [true, 'Please Enter Your Gender']
    },
    password: {
        type:  String,
        required : [true, 'Please Enter Your Password']
    },
    pronoun: {
        type:  String,
        required : false,
        default : null,
    },
    otp:{
        type: Number,
        default: null,
    }
},{
    timestamp: true,
}
);


export const User = mongoose.model('User', userSchema)