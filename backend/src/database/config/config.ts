import { Options } from 'sequelize'

const config: Options = {
  database: 'mydb',
  username: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
}

module.exports = config
