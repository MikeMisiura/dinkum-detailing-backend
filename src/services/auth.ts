import { Request } from 'express'
import axios from 'axios'
import { reCAPTCHASecret } from '../environmentTypes'

export const verifyReCaptcha = async (req: Request) => {
    const reCAPTCHAHeader: any = req.headers.recaptcha

    if (!reCAPTCHAHeader) {
        return null
    }
    const captchaToken = reCAPTCHAHeader.split(' ')[1]


    // Call Google's API to get score
    const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${captchaToken}`
    );

    // Extract result from the API response
    if (res.data.success) {
        console.log('Human');
        return true
    } else {
        console.log('BOT!!!');
        return false
    }
}

