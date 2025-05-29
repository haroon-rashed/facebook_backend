import {User} from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

   const sendOtp = async(newUser, m_mail) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: m_mail,
        subject: 'Verify your email',
        html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 50px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<div style="background-color: #4CAF50; padding: 20px; text-align: center;">
  <h1 style="color: #ffffff; margin: 0;">Verify Your Email</h1>
</div>
<div style="padding: 30px; text-align: center;">
  <h2 style="color: #333333;">Your OTP Code</h2>
  <p style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">{${newUser.otp}}</p>
  <p style="color: #555555;">Please enter this OTP to verify your email address.<br>This code will expire in 10 minutes.</p>
  <a href="#" style="display: inline-block; margin-top: 30px; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Now</a>
</div>
<div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888888;">
  <p>If you did not request this code, you can safely ignore this email.</p>
</div>
</div>
</body>
</html>
`
    }

    const sendMail = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
            return res.status(500).json({message: "Email not sent"})
        } else {
            console.log("Email sent: " + info.response);
        }
    })
   }


  const genrateOTP = () => {
    let rendom  = Math.floor(Math.random() * 999999);
    if(rendom < 100000){
        rendom *= 10
  }
  return rendom;
}


export const registerUser = async(req, res) => {
    try {
        const {f_name, l_name, date, month, year, gender, m_mail, password, pronoun} = req.body;

        if(!f_name || !l_name || !date || !month || !year || !gender || !m_mail || !password){
             res.status(400)
            throw new Error("Please fill all the fields")
        }

        let checkUser = await User.findOne({ m_mail })

        if(checkUser){
            return res.status(401).json({message: "Email already exists"}) 
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            f_name, l_name, date, month, year, gender, m_mail, password: hashedPassword, pronoun, otp: genrateOTP()
        })


       sendOtp(newUser, m_mail)
        
        return res.status(201).json({
          _id: newUser._id,
          f_name: newUser.f_name,
          l_name: newUser.l_name,
          date: newUser.date,
          month: newUser.month,
          year: newUser.year,
          m_mail: newUser.m_mail,
          password: newUser.password,
          pronoun: newUser.pronoun,
          otp: newUser.otp,
          gender: newUser.gender,
          token: await genrateToken(newUser._id),
        }) 
    } catch (error) {
        console.error("Registration error: ", error)
        return res.status(500).json({message: "Server error"}) 
    }
}



 export const verifyUser = async (req, res) => {
  try {
    const { otp } = req.body;
    const { user_id } = req.params;

    const findUser = await User.findById(user_id);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (String(findUser.otp) !== String(otp)) {  
      return res.status(401).json({ message: "Invalid OTP" });
    }

    findUser.otp = null;
    await findUser.save();

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Verification error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const loginUser = async(req, res)=>{
  const {m_mail, password} = req.body;
  if(!m_mail || !password){
    return res.status(400).json({message: "Please fill all the fields"})
  }
  const checkUser = await User.findOne({m_mail})
  if(!checkUser){
    return res.status(401).json({message: "Invalid email or password"})
  }
  const checkPassword = await bcrypt.compare(password, checkUser.password)
  if(!checkPassword){
    return res.status(401).json({message: "Invalid email or password"})
  }
  return res.status(201).json({
    _id: checkUser._id,
    f_name: checkUser.f_name,
    l_name: checkUser.l_name,
    date: checkUser.date,
    month: checkUser.month,
    year: checkUser.year,
    m_mail: checkUser.m_mail,
    password: checkUser.password,
    pronoun: checkUser.pronoun,
    otp: checkUser.otp,
    gender: checkUser.gender,
    token: await genrateToken(checkUser._id),
  }) 
  console.log(checkUser._id)
}

export const genrateToken = async(id) =>{
  return jwt.sign({id}, process.env.JWT_SECRETE, {expiresIn: '15d'})
}


export const getUserInfo = async (req, res) =>{
  const {user_id} = req.params;
  const myInfo = await User.findById(user_id)
  res.send(myInfo)
}

export const allUsers = async (req, res) => {
  const allUsers = await User.find()
  res.send(allUsers)
}