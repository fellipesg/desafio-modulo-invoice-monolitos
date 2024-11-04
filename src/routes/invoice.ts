import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para buscar a fatura
  res.status(200).json({ id, message: 'Invoice details' });
});

export default router;