import md5 = require('md5');
import jwt = require('jsonwebtoken')
import { userModel } from "../models/Users";
import {setings} from "../config/keys"
async function login ( req, res) {
    const userAuth = await userModel.findOne({
        email:req.body.email.toLowerCase(),
        password:md5(req.body.password+req.body.email.toLowerCase())
    })
    if (!(userAuth )){
        res.status(404).json({
            message: 'No user found with this login information'
        })        
    }
    else{        
        const token = jwt.sign({
            email: userAuth.email.toLowerCase(),
            userId: userAuth._id
        },setings.jwt_s,{
            expiresIn:3600
        })
        res.status(200).json({
            token: `Bearer ${token}`
        })  
        
    }
}

async function register ( req, res ) {
    
    if ((!('adminkey' in req.body))||(setings.adminkey===req.body.adminkey)){
    if (!(await userModel.findOne({email:req.body.email.toLowerCase()}))){
        let admin
        if ('adminkey' in req.body){
            admin=true
        }
        else{
            admin=false
        }
        const user = new userModel({
            email:req.body.email.toLowerCase(),
            password:md5(req.body.password+req.body.email.toLowerCase()),
            admin:admin
        })
        try {
        await user.save()        
        res.status(201).json({
            message:"User successfully created",
            user:user            
        })
        }
        catch(e){
            res.status(409).json({
                message:"Creation error. Please try later",
                
            })
        }
        
    }
    else {
        res.status(409).json({
            message:"User with this email already exists"
            
        })
    }
}
else{
    res.status(409).json({
        message:"Invalid admin code. To register as a user, leave this field blank."
        
    })
}

    
}


export { login,register };
