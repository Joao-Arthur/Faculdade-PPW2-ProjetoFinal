import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import Band from './band.schema';

const router = express.Router();

router.get('/', async (req, res) => {
    const name = req.query.name?.toString();
    const activeAt = req.query.activeAt?.toString();
    const foundation = Number(req.query.foundation?.toString());
    const dissolution = Number(req.query.dissolution?.toString());
    const album = req.query.album?.toString();
    const song = req.query.song?.toString();

    const bandList = await Band.find();
    res.send(bandList);
});

type bandType = {
    name: String;
    members: String[];
    foundation: Number;
    dissolution: Number;
    albums?: String[];
};

router.post('/', async (req: Request<{}, {}, bandType>, res) => {
    const band = req.body;
    let albums = [];

    try {
        if (!band.name) throw new Error();
        if (!band.members) throw new Error();
        if (!band.foundation) throw new Error();
        if (!band.dissolution) throw new Error();

        if (typeof band.name !== 'string') throw new Error();
        if (!Array.isArray(band.members)) throw new Error();
        if (typeof band.foundation !== 'number') throw new Error();
        if (typeof band.dissolution !== 'number') throw new Error();

        if (!band.name.length) throw new Error();
        if (!band.members.length) throw new Error();
        if (!(band.foundation > 0)) throw new Error();
        if (band.dissolution < 0) throw new Error();
    } catch {
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    }

    try {
        const search = new URLSearchParams({
            strict: 'on',
            q: `artist:"${band.name}"`
        }).toString();

        const results = await fetch(`https://api.deezer.com/search?${search}`)
            .then(res => res.json())
            .then(({ data }) => data);
        const artist = results[0].artist;
        const artistId = artist.id;

        function addAlbums(newAlbums) {
            albums = albums.concat(
                newAlbums
                    .filter(({ record_type }) => record_type === 'album')
                    .map(({ title }) => title)
            );
        }

        let fetchedAlbums = await fetch(
            `https://api.deezer.com/artist/${artistId}/albums`
        ).then(res => res.json());
        addAlbums(fetchedAlbums.data);

        while (fetchedAlbums.next) {
            fetchedAlbums = await fetch(fetchedAlbums.next).then(res =>
                res.json()
            );
            addAlbums(fetchedAlbums.data);
        }

        band.albums = albums;
    } catch (e) {
        console.error(e);
    }

    try {
        await Band.create({ band });
        return res.sendStatus(StatusCodes.CREATED);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.delete('/', async (req, res) => {
    const band = req.body;
    try {
        const { deletedCount } = await Band.deleteOne(band);
        if (deletedCount === 1) {
            res.sendStatus(StatusCodes.OK);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
