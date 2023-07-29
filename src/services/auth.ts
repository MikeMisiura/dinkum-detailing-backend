import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { Request } from 'express'
import axios from 'axios'
import { reCAPTCHASecret } from '../developerInfo'

const secret = 'Hello, Goodbye, Friend'

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        { userId: user.userId },
        secret,
        { expiresIn: '1hr' }
    )
    return token
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return null
    }

    const token = authHeader.split(' ')[1]
    try {
        let decoded: any = await jwt.verify(token, secret)
        return User.findByPk(decoded.userId)
    }
    catch (err) {
        return null
    }
}

export const verifyReCaptcha = async (req: Request) => {
    // Extract token
    // const { 
    //     formData,
    //     captchaToken
    //   } = req.body;
    console.log(req.headers.recaptcha)
    const reCAPTCHAHeader: any = req.headers.recaptcha
    console.log(reCAPTCHAHeader)

    if (!reCAPTCHAHeader) {
        return null
    }
    const captchaToken = reCAPTCHAHeader.split(' ')[1]


    // Call Google's API to get score
    const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${captchaToken}`
    );

    console.log(res.data)

    // Extract result from the API response
    if (res.data.success) {
        console.log('Human');
        return true
    } else {
        console.log('BOT!!!');
        return false
    }
}

