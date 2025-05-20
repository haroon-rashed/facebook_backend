import jwt from 'jsonwebtoken'
import { User } from '../Models/userModel.js';

export const authHandler = async(req, res, next) =>{
  let token;

  if(req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(" ")[1]
      let decode = jwt.verify(token, process.env.JWT_SECRETE)
      let user = await User.findById(decode.id)
      req.user = user;
      next()
      console.log(decode)
    } catch (error) {
      
    }
  }else{
    res.status(401)
    throw new Error("Session EXpired")
  }
}