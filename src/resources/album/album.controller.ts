import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const title = req.query.title?.toString();
    const band = req.query.band?.toString();
    const song = req.query.song?.toString();
    const release = Number(req.query.release?.toString());

    res.send([1, 2, 3]);
});

router.post('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.delete('/', (req, res) => {
    res.send([1, 2, 3]);
});

export default router;
