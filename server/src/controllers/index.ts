import express from 'express';

const router = express.Router();

router.get('/ping', (_, response) => {
  response.json({ message: 'pong' });
});

export default router;
