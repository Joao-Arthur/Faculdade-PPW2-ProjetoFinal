import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    console.log(new Date(), 'POST /user');
    res.send([1, 2, 3]);
});

router.delete('/', (req, res) => {
    console.log(new Date(), 'DELETE /user');
    res.send([1, 2, 3]);
});

router.post('/login', (req, res) => {
    console.log(new Date(), 'POST /user/login');
    res.send([1, 2, 3]);
});

export default router;
