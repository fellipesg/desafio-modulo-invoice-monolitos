import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';
import clientRoutes from './routes/clients';
import checkoutRoutes from './routes/checkout';
import invoiceRoutes from './routes/invoice';
import { Sequelize } from "sequelize-typescript"
import { ClientModel } from './modules/client-adm/repository/client.model';
import { ProductModel } from './modules/product-adm/repository/product.model';
import TransactionModel from './modules/payment/repository/transaction.model';
import { InvoiceModel } from './modules/invoice/repository/invoice.model';
import { InvoiceItemsModel } from './modules/invoice/repository/invoiceItem.model';

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/products', productRoutes);
app.use('/clients', clientRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', invoiceRoutes);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([ClientModel, ProductModel, TransactionModel, InvoiceModel, InvoiceItemsModel]);
  await sequelize.sync();
}
setupDb();
export default app;