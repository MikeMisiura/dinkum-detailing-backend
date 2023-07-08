import { Sequelize } from "sequelize";
import { FooFactory } from "./foo";

const dbName = 'dinkumDb';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// TODO: add data model with a factory
FooFactory(sequelize);

export const db = sequelize;