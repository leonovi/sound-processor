import express from 'express';
import { auth } from '../services/auth';

const router = express.Router();

router.post('/reg', auth.reg);
router.post('/login', auth.login);

export default router;
