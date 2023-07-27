import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Estimate extends Model<InferAttributes<Estimate>, InferCreationAttributes<Estimate>>{
    declare estimateId: number;
    declare userId: number;
    declare price: number;
    declare seats: number;
    declare leather: boolean;
    declare conditioner: boolean;
    declare pets: boolean;
    declare smoke: boolean;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function EstimateFactory(sequelize: Sequelize) {
    Estimate.init({
        estimateId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        leather: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        conditioner: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pets: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        smoke: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        tableName: 'estimate',
        sequelize
    });
}

export function AssociateUserEstimate() {
    User.hasMany(Estimate, { foreignKey: 'userId' });
    Estimate.belongsTo(User, { foreignKey: 'userId' });
}