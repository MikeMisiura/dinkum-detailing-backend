import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserMessage, MessageFactory } from "./message";
import { dbPassword } from "../developerInfo";
import { EstimateFactory } from "./estimate";

const dbName = 'dinkumDb';
const username = 'root';
const password = dbPassword;

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// TODO: add data model with a factory
UserFactory(sequelize);
MessageFactory(sequelize);
EstimateFactory(sequelize);
AssociateUserMessage();

export const db = sequelize;