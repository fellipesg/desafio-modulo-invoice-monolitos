import express, { Express } from "express";
import productRoutes from '../routes/products';
import clientRoutes from '../routes/clients';
import checkoutRoutes from '../routes/checkout';
import invoiceRoutes from '../routes/invoice';


const app: Express = express();
app.use(express.json());
app.use("/client", clientRoutes);
app.use("/product", productRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/checkout", checkoutRoutes)
export default app;

