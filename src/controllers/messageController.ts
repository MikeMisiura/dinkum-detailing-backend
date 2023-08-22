import { RequestHandler } from "express";
import { sendEmail } from '../services/sendEmail';
import { adminRecipient } from '../environmentTypes';
import { verifyReCaptcha } from '../services/auth';

export const createMessage: RequestHandler = async (req, res, next) => {
    console.log('createMessage')

    // ------------reCAPTCHA------------
    // verify human; return 403 if bot
    let human: boolean | null | undefined = await verifyReCaptcha(req);
    if (!human) { return res.status(403).send() }

    console.log('human' + human)

    function validateEmail(email: string) {
        let test = /\S+@\S+\.\S+/;
        return test.test(email);
    }

    if (!req.body.email || !validateEmail(req.body.email) || !req.body.message) {
        res.status(400).send('email and message required');
    }

    sendEmail({
        subject: "Your Message to Dinkum Detailing",
        body: 'Thank you for reaching out! We will be in touch shortly. Your message: ' + req.body.message + ' Your phone number: ' + req.body.phone,
        to: [adminRecipient, { email: req.body.email }],
        from: adminRecipient
    })

    sendEmail({
        subject: "New Message from " + req.body.email,
        body: 'Phone Number: ' + req.body.phone + 
            'NEW MESSAGE: ' + req.body.message,
        to: [adminRecipient],
        from: { email: req.body.email }
    })
    res.status(200).send();

}