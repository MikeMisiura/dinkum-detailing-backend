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

// Frontend IPs
export const frontendUrl: string = process.env.FRONTEND_URL ?? '';
export const frontendIP1: string = process.env.FRONTEND_IP1 ?? '';
export const frontendIP2: string = process.env.FRONTEND_IP2 ?? '';
export const frontendIP3: string = process.env.FRONTEND_IP3 ?? '';
export const frontendLH: string = process.env.FRONTEND_LOCALHOST ?? '';
export const frontendIPs: string[] = [
    frontendUrl, 
    frontendIP1, 
    frontendIP2, 
    frontendIP3,
    frontendLH
]


// misc
export const port: string = process.env.PORT ?? '';
