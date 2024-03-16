import { Model, DataTypes } from 'sequelize'
import db from '.'

class UserModel extends Model {
  public id!: number
  public name!: string
  public email!: string
  public cpf!: string
  public phonenumber!: string
  public status!: 'Ativo' | 'Inativo' | 'Aguardando ativação' | 'Desativado'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Ativo', 'Inativo', 'Aguardando ativação', 'Desativado'),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users'
  }
)

export default UserModel
