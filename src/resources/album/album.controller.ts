import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Album from './album.schema';

const router = express.Router();

type albumType = {
    title: String;
    band: String;
    trackList: String[];
    release: Date;
};

router.get('/', async (req, res) => {
    console.log(new Date(), 'GET /album');
    const title = req.query.title?.toString();
    const band = req.query.band?.toString();
    const song = req.query.song?.toString();
    const release = Number(req.query.release?.toString());
    const albumList = await Album.find();
    res.send(albumList);
});

router.post('/', async (req: Request<{}, {}, albumType>, res) => {
    console.log(new Date(), 'POST /album');
    const album = req.body;
    try {
        if (!album.title) throw new Error();
        if (!album.band) throw new Error();
        if (!album.trackList) throw new Error();
        if (!album.release) throw new Error();

        if (typeof album.title !== 'string') throw new Error();
        if (typeof album.band !== 'string') throw new Error();
        if (!Array.isArray(album.trackList)) throw new Error();
        if (album.release instanceof Date) throw new Error();

        if (!album.title.length) throw new Error();
        if (!album.band.length) throw new Error();
        if (!album.trackList.length) throw new Error();
        if (album.release < 0) throw new Error();
    } catch {
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    }

    try {
        await Album.create(album);
        return res.sendStatus(StatusCodes.CREATED);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.delete('/', (req, res) => {
    console.log(new Date(), 'DELETE /album');
    res.send([1, 2, 3]);
});

export default router;
