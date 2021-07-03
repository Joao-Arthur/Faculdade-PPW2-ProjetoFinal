import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from './user.schema';

const router = express.Router();

type postUser = {
    name?: string;
    username?: string;
    password?: string;
};

router.post('/', async (req: Request<{}, {}, postUser>, res) => {
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

    try {
        if (!user.username) throw new Error();
        if (!user.password) throw new Error();

        if (typeof user.username !== 'string') throw new Error();
        if (typeof user.password !== 'string') throw new Error();

        if (!user.username.length) throw new Error();
        if (!user.password.length) throw new Error();
    } catch {
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    }

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
