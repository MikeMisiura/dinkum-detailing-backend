import { IRecipient } from "./services/sendEmail"
import * as dotenv from "dotenv";

dotenv.config()

// Dev Only!
export const devRecipient: IRecipient = { 
    name: process.env.NAME ?? '', 
    email: process.env.EMAIL ?? '' 
}

// Admin email info
export const adminRecipient: IRecipient = { 
    name: process.env.NAME ?? '', 
    email: process.env.EMAIL ?? '' 
}

// database
export const dbName: string = process.env.DATABASE_NAME ?? '';
export const dbUsername: string = process.env.DATABASE_USERNAME ?? '';
export const dbPassword: string = process.env.DATABASE_PASSWORD ?? '';
export const dbHost: string = process.env.DATABASE_HOST ?? '';
export const dbPort: number = parseInt(process.env.DATABASE_PORT ?? '');


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
export const frontendUrl: string = process.env.FRONTEND_URL ?? '';
export const port: string = process.env.PORT ?? '';