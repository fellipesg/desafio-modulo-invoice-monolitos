import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: 'product-registration-table',
  tableName: "products-registration",
  timestamps: false,
})

export default class ProductRegistrationModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false})
  declare description: string

  @Column({allowNull: false})
  declare purchasePrice: number

  @Column({allowNull: false})
  declare stock: number

  @Column({allowNull: false})
  declare createdAt: Date

  @Column({allowNull: false})
  declare updatedAt: Date
}