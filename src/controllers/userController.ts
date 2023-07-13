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

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.email) {
        let created = await User.create(newUser);
        res.status(201).json({
            userId: created.userId,
            username: created.email
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
}