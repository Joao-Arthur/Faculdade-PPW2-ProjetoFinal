import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.schema';

const router = express.Router();

router.post('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.delete('/', (req, res) => {
    try {
        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.post('/login', (req, res) => {
    res.send([1, 2, 3]);
});

export default router;
