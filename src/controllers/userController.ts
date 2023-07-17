import { RequestHandler } from "express";
import { User } from "../models/user";
import { signUserToken } from "../services/auth";
const Nylas = require('nylas');
const { default: Draft } = require('nylas/lib/models/draft');

export const loginUser: RequestHandler = async (req, res, next) => {

    if (!req.body.email) {
        return res.status(400).send('email required');
    }

    let existingUser: User | null = await User.findOne({
        where:
            { email: req.body.email }
    });

    if (!existingUser) {
        const newUser: User = req.body;
        try {
            console.log(newUser)
            let created = await User.create(newUser);
            console.log(created)
            existingUser = created
        }
        catch (err) {
            return res.status(500).send(err);
        }
    }

    // TODO: add authentication

    let token = await signUserToken(existingUser);

    let tokenizedLink = "http://localhost:3001/login/token/" + token

    console.log(tokenizedLink)

    //Send Email
    Nylas.config({
        clientId: "5g6s3fky71a9p1i7kafs9fnd8",
        clientSecret: "c76lzmje7wme0lbjbuvl2xjfy",
    });

    const nylas = Nylas.with("aeuRVmDVDEhWFPGjILnDfOLPlQA4a9");

    const draft = new Draft(nylas, {
        subject: 'User Authentication',
        body: 'Click this link to login: ' + tokenizedLink,
        to: [
            // { name: 'Matthew Slater', email: 'mattslat4@gmail.com' },
            // { name: 'Mike Misiura', email: 'mikemisiura@gmail.com' },
            { email: existingUser.email }
        ]
    });

    // Send the draft
    draft.send().then((message: { id: any; }) => {
        console.log(`${message.id} was sent`);
    });


    res.status(200).json({ existingUser });
}