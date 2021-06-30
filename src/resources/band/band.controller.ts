import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.query.name?.toString();
    const activeAt = req.query.activeAt?.toString();
    const foundation = Number(req.query.foundation?.toString());
    const dissolution = Number(req.query.dissolution?.toString());
    const album = req.query.album?.toString();
    const song = req.query.song?.toString();

    res.send([1, 2, 3]);
});

router.post('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.delete('/', (req, res) => {
    res.send([1, 2, 3]);
});

export default router;
