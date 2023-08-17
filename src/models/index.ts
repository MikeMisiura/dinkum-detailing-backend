import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserMessage, MessageFactory } from "./message";
import { dbHost, dbName, dbPassword, dbPort, dbUsername } from "../environmentTypes";

import { EstimateFactory, AssociateUserEstimate } from "./estimate";


const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    dialect: 'sqlite',
    host: dbHost,
    // port: dbPort,

    storage: 'database.sqlite',
    logging: false
});

// // TODO: add data model with a factory
UserFactory(sequelize);
MessageFactory(sequelize);
EstimateFactory(sequelize);
AssociateUserMessage();
AssociateUserEstimate();

export const db = sequelize;