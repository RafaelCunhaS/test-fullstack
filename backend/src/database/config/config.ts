import { Options } from 'sequelize';

const config: Options = {
  database: 'mydatabase',
  username: 'root',
  password: '1234',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
};

export default config;
