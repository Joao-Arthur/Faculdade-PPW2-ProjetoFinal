import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.post('/login', (req, res) => {
    res.send([1, 2, 3]);
});

export default router;
