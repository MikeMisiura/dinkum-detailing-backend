import { Message } from './../models/message';
import { RequestHandler } from "express";
import { User } from "../models/user";
import { sendEmail } from '../services/sendEmail';
import { devRecipient } from '../developerInfo';
import { findCreateUser } from './userController';
import { verifyReCaptcha } from '../services/auth';

export const getAllMessages: RequestHandler = async (req, res, next) => {
    let messages = await Message.findAll();
    res.status(200).json(messages);
}

export const createMessage: RequestHandler = async (req, res, next) => {

    // ------------reCAPTCHA------------
    // verify human; return 403 if bot
    let human: boolean | null | undefined = await verifyReCaptcha(req);
    if (!human) { return res.status(403).send() }
    
    function validateEmail(email: string) {
        let test = /\S+@\S+\.\S+/;
        return test.test(email);
      }

    if (!req.body.email || validateEmail(req.body.email) === false || !req.body.message) {
        res.status(400).send('email and message required');
    }else{

    const user: User | null = await findCreateUser(req.body)
    if (!user) {
        return res.status(400).send('database err');
    }

    let newMessage: any = {
        message: req.body.message,
        userId: user.userId
    };

    if (newMessage.message) {
        let created = await Message.create(newMessage);
        res.status(201).json(created);

        sendEmail({
            subject: "New Message",
            body: 'NEW MESSAGE:' + newMessage.message,
            to: [devRecipient, { email: user.email }]
        })
    } else {
        res.status(400).send();
    }
}
}

export const getOneMessage: RequestHandler = async (req, res, next) => {
    let messageId = req.params.messageId;
    let messageFound = await Message.findByPk(messageId);
    if (messageFound) {
        res.status(200).json(messageFound);
    }
    else {
        res.status(404).json({});
    }
}

export const editMessage: RequestHandler = async (req, res, next) => {

    let messageId = req.params.messageId;
    let newMessage: Message = req.body;

    let messageFound = await Message.findByPk(messageId);

    if (messageFound && messageFound.messageId == newMessage.messageId && newMessage.message) {
        await Message.update(newMessage, {
            where: { messageId: messageId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteMessage: RequestHandler = async (req, res, next) => {

    let messageId = req.params.messageId;
    let messageFound = await Message.findByPk(messageId);

    if (messageFound) {
        await Message.destroy({
            where: { messageId: messageId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}