import { RequestHandler } from "express";
import { User } from "../models/user";

export const loginUser: RequestHandler = async (req, res, next) => {

    if (!req.body.email) {
        return res.status(400).send('email required');
    }

    const existingUser: User | null = await User.findOne({
        where:
            { email: req.body.email }
    });

    if (!existingUser) {
        return res.status(400).send('email not found');
    }

    // TODO: add authentication

        // let token = await signUserToken(existingUser);
        res.status(200).json({ existingUser });
}
