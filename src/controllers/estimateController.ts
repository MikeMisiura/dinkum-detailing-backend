import { RequestHandler } from "express";
import { sendEmail } from '../services/sendEmail';
import { adminRecipient } from '../environmentTypes';
import { verifyReCaptcha } from '../services/auth';

export const createEstimate: RequestHandler = async (req, res, next) => {

    // ------------reCAPTCHA------------
    // verify human; return 403 if bot
    let human: boolean | null | undefined = await verifyReCaptcha(req);
    if (!human) { return res.status(403).send() }

    function validateEmail(email: string) {
        let test = /\S+@\S+\.\S+/;
        return test.test(email);
    }

    if (!req.body.email || !validateEmail(req.body.email)) {
        res.status(400).send('email required');
    }

    let newEstimate: any = {
        seats: req.body.seats,
        leather: req.body.leather,
        conditioner: req.body.conditioner,
        pets: req.body.pets,
        smoke: req.body.smoke,
        price: req.body.price
    };

    sendEmail({
        subject: "New Estimate",
        body: 'Thank you for submitting your estimate. ' +
            "Price (tax included): " + newEstimate.price +
            " Seats: " + newEstimate.seats +
            " Leather: " + newEstimate.leather +
            " conditioner: " + newEstimate.conditioner +
            " pets: " + newEstimate.pets +
            " smoke: " + newEstimate.smoke,
        to: [adminRecipient, { email: req.body.email }]
    })
    res.status(200).send();
}