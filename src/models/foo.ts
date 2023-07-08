import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Foo extends Model<InferAttributes<Foo>, InferCreationAttributes<Foo>>{
    declare fooId: number;
    declare barId: number;
}

export function FooFactory(sequelize: Sequelize) {
    Foo.init({
        fooId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        barId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'orders',
        sequelize
    });
}