// src/routes/products.ts
import { Router } from 'express';
import ProductAdmFacadeFactory from '../modules/product-adm/factory/facade.factory';


const router = Router();

router.post('/', async (req, res) => {
    try {
        const { id, name, description, purchasePrice, stock } = req.body;
        const input = {
          id,
          name,
          description,
          purchasePrice,
          stock,
        };
        const productFacade = ProductAdmFacadeFactory.create();
        const output = await productFacade.addProduct(input);
        res.status(201).json(output);
      } catch (error) {
        res.status(400).json({ message: error });
      }
});

export default router;