import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserMessage, MessageFactory } from "./message";
import { dbHost, dbName, dbPassword, dbPort, dbUsername } from "../environmentTypes";

import { EstimateFactory } from "./estimate";


const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: 'dbHost',
    port: dbPort,
    dialect: 'mysql'
});

// TODO: add data model with a factory
UserFactory(sequelize);
MessageFactory(sequelize);
EstimateFactory(sequelize);
AssociateUserMessage();
AssociateUserEstimate();

export const db = sequelize;