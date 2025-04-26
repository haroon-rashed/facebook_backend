import {User} from '../Models/userModel.js';
import bcrypt from 'bcrypt';
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
            f_name, l_name, date, month, year, gender, m_mail, password: hashedPassword, pronoun
        })
        
        return res.status(201).json(newUser) 
    } catch (error) {
        console.error("Registration error: ", error)
        return res.status(500).json({message: "Server error"}) 
    }
}