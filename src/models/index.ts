import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserMessage, MessageFactory } from "./message";
import { dbPassword } from "../developerInfo";

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
AssociateUserMessage();

export const db = sequelize;