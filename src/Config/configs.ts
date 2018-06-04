import { Sequelize } from "sequelize-typescript";

export const config = {
    secret: 'iWineb@W@',
};

export class GlobalVars {
  public static SequelizeInstance: Sequelize;
}