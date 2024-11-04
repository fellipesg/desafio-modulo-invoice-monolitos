import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';
import clientRoutes from './routes/clients';
import checkoutRoutes from './routes/checkout';
import invoiceRoutes from './routes/invoice';

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/products', productRoutes);
app.use('/clients', clientRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', invoiceRoutes);

export default app;