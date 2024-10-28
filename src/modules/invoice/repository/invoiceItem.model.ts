import { Column, Model, PrimaryKey, Table, ForeignKey } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'invoice_items',
  timestamps: false
})
export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;
}