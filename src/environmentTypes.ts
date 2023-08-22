import { IRecipient } from "./services/sendEmail"
import * as dotenv from "dotenv";

dotenv.config()

// Admin email info
export const adminRecipient: IRecipient = { 
    name: process.env.NAME ?? '', 
    email: process.env.EMAIL ?? '' 
}

// Nylas Info
type nylasClientDataType = {
    clientId: string,
    clientSecret: string,
    accessToken: string
}

export const nylasClientData: nylasClientDataType = {
    clientId: process.env.NYLAS_CLIENT_ID ?? '',
    clientSecret: process.env.NYLAS_CLIENT_SECRET ?? '',
    accessToken: process.env.NYLAS_ACCESS_TOKEN ?? ''
}

// reCAPTCHA 
export const reCAPTCHASecret: string =  process.env.RECAPTCHA_SECRET ?? ''

// misc
export const port: string = process.env.PORT ?? '';
