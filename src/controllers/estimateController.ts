import { RequestHandler } from "express";
import { sendEmail } from '../services/sendEmail';
import { adminRecipient } from '../environmentTypes';
import { verifyReCaptcha } from '../services/auth';

export const createEstimate: RequestHandler = async (req, res, next) => {

    // ------------reCAPTCHA------------
    // verify human; return 403 if bot
    let human: boolean | null | undefined = await verifyReCaptcha(req);
    // if (!human) { return res.status(403).send() }

    function validateEmail(email: string) {
        let test = /\S+@\S+\.\S+/;
        return test.test(email);
    }

    if (!req.body.email || !validateEmail(req.body.email)) {
        res.status(400).send('email required');
    }

    let newEstimate: any = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        seats: req.body.seats,
        leather: req.body.leather,
        conditioner: req.body.conditioner,
        pets: req.body.pets,
        smoke: req.body.smoke,
        price: req.body.price
    };

    sendEmail({
        subject: "New Estimate",
        body: 'Hey Danny! You have a new customer!' + '<br/>' +
            " Name: " + newEstimate.name + '<br/>' +
            " Phone Number: " + newEstimate.phone + '<br/>' +
            " Email: " + newEstimate.email + '<br/>' +
            " Price (tax included): $" + newEstimate.price + '<br/>' +
            " Seats: " + newEstimate.seats + '<br/>' +
            " Leather: " + newEstimate.leather + '<br/>' +
            " Conditioner: " + newEstimate.conditioner + '<br/>' +
            " Pets: " + newEstimate.pets + '<br/>' +
            " Smoke: " + newEstimate.smoke,
        to: [adminRecipient]
    })
    res.status(200).send();
}