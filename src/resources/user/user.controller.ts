import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.schema';

const router = express.Router();

router.post('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.sendStatus(StatusCodes.BAD_REQUEST);
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        if (deletedUser) {
            res.send(deletedUser);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.post('/login', (req, res) => {
    res.send([1, 2, 3]);
});

export default router;
