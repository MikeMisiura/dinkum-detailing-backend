import { RequestHandler } from "express";
import { sendEmail } from '../services/sendEmail';
import { adminRecipient } from '../environmentTypes';
import { verifyReCaptcha } from '../services/auth';

export const createMessage: RequestHandler = async (req, res, next) => {

    // ------------reCAPTCHA------------
    // verify human; return 403 if bot
    let human: boolean | null | undefined = await verifyReCaptcha(req);
    if (!human) { return res.status(403).send() }

    function validateEmail(email: string) {
        let test = /\S+@\S+\.\S+/;
        return test.test(email);
    }

    if (!req.body.email || !validateEmail(req.body.email) || !req.body.message) {
        res.status(400).send('email and message required');
    }

    sendEmail({
        subject: "Your Message to Dinkum Detailing",
        body: 'Thank you for reaching out! We will be in touch shortly. ' + 
            'If you prefer, you can email us at ' + adminRecipient.email +
            ' or call us at (320) 496-6010. ' + 
            'We have Your message as: ' + req.body.message + 
            ' And your phone number as: ' + req.body.phone,
        to: [adminRecipient, { email: req.body.email }],
    })

    res.status(200).send();
}