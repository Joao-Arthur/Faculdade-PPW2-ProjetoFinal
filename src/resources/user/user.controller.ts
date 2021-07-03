import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import isValid from '../../isValid';
import User from './user.schema';

const router = express.Router();

type postUser = {
    name?: string;
    username?: string;
    password?: string;
};

router.post('/', async (req: Request<{}, {}, postUser>, res) => {
    const user = req.body;
    if (
        !isValid(
            {
                name: { type: 'string', required: true },
                username: { type: 'string', required: true },
                password: { type: 'string', required: true }
            },
            user
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);

    try {
        await User.create(user);
        if (!process.env.JWT_KEY)
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        const token = jwt.sign(user.username, process.env.JWT_KEY);
        res.send(token);
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

type postLogin = {
    username?: string;
    password?: string;
};

router.post('/login', async (req: Request<{}, {}, postLogin>, res) => {
    const user = req.body;
    if (
        !isValid(
            {
                username: { type: 'string', required: true },
                password: { type: 'string', required: true }
            },
            user
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    try {
        const foundUser = await User.findOne(user);
        if (!foundUser) return res.sendStatus(StatusCodes.NOT_FOUND);
        if (!process.env.JWT_KEY)
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        const token = jwt.sign(user.username, process.env.JWT_KEY);
        res.send(token);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
