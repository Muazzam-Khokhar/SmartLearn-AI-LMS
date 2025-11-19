import { timeStamp } from 'console';
import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.json({ status: 'ok', timeStamp: new Date() });
});

export default router;
