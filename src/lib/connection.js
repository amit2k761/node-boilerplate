import Sequelize from "sequelize";
import config from "../config/index";

export const sequelize = new Sequelize(config.sqlServerDetails.DB, 
    config.sqlServerDetails.USER, 
    config.sqlServerDetails.PASSWORD, {
    host: config.sqlServerDetails.HOST,
    dialect: config.sqlServerDetails.dialect
});