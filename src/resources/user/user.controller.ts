import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.schema';

const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;

    try {
        if (!user.name) throw new Error();
        if (!user.username) throw new Error();
        if (!user.password) throw new Error();
        if (typeof user.name !== 'string') throw new Error();
        if (typeof user.username !== 'string') throw new Error();
        if (typeof user.password !== 'string') throw new Error();
        if (!user.name.length) throw new Error();
        if (!user.username.length) throw new Error();
        if (!user.password.length) throw new Error();
    } catch {
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    }

    try {
        const createdUser = await User.create(user);
        return res.send(createdUser);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
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
