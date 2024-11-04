import { Router } from 'express';
import ClientAdmFacadeFactory from '../modules/client-adm/factory/client-adm.facade.factory';
import Address from '../modules/@shared/domain/value-object/address';

const router = Router();

router.post('/', async (req, res) => {
  const facade = ClientAdmFacadeFactory.create()

  try {

        const input = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
              req.body.address.street,
              req.body.address.number,
              req.body.address.complement,
              req.body.address.city,
              req.body.address.state,
              req.body.address.zipCode,
            )
        };

        const output = await facade.add(input);
        return res.status(201).json(output);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;