import { RequestHandler } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";
const Nylas = require('nylas');
const { default: Draft } = require('nylas/lib/models/draft');

export const getAllMessages: RequestHandler = async (req, res, next) => {
    let messages = await Message.findAll();
    res.status(200).json(messages);
}

export const createMessage: RequestHandler = async (req, res, next) => {
    //For email authentication
    
    // if (!req.body.email) {
    //     res.status(400).send('email required');
    // }

    // const user: User | null = await User.findOne({
    //     where:
    //         { email: req.body.email }
    // });
    
    // if (!user) {
    //     const user: User = req.body;
    //     try {
    //             let created = await user.save();
    //             res.status(201).json({
    //                 email: created.email,
    //                 userId: created.userId
    //             });
    //     }
    //     catch (err) {
    //         res.status(500).send(err);
    //     }
    // }

    let newMessage: Message = req.body;
    
    if (newMessage.message) {
        let created = await Message.create(newMessage);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }

    //Send Email
    Nylas.config({
        clientId: "5g6s3fky71a9p1i7kafs9fnd8",
        clientSecret: "c76lzmje7wme0lbjbuvl2xjfy",
    });
    
    const nylas = Nylas.with("aeuRVmDVDEhWFPGjILnDfOLPlQA4a9");
    
    const draft = new Draft(nylas, {
      subject: 'New Message',
      body: 'NEW MESSAGE:' + newMessage.message,
      to: [{ name: 'Matthew Slater', email: 'mattslat4@gmail.com' }, { name: 'Mike Misiura', email: 'mikemisiura@gmail.com' }]
    });
    
    // Send the draft
    draft.send().then((message: { id: any; }) => {
        console.log(`${message.id} was sent`);
    });
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