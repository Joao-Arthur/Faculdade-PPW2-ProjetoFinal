import mongoose from 'mongoose';
import Album from './resources/album/album.schema';
import Band from './resources/band/band.schema';

export async function setupConnection() {
    try {
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const mongourl = process.env.MONGO_URL;
        if (!username) throw new Error(`'username' not configured at .env!`);
        if (!password) throw new Error(`'password' not configured at .env!`);
        if (!mongourl) throw new Error(`'mongourl' not configured at .env!`);

        const uri = `mongodb+srv://${username}:${password}@${mongourl}`;

        const client = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const beatles = {
            name: 'The Beatles',
            members: [
                'John Lennon',
                'Paul McCartney',
                'George Harrison',
                'Ringo Starr'
            ],
            foundation: 1960,
            dissolution: 1970
        };

        const rubberSoul = {
            title: 'Rubber Soul',
            band: 'The Beatles',
            releaseDate: 1965,
            trackList: [
                'Drive My Car',
                'Norwegian Wood (This Bird Has Flown)',
                'In My Life'
            ]
        };

        await Band.create(beatles);
        await Album.create(rubberSoul);

        const lista1 = await Band.find();
        const lista2 = await Album.find();

        await Band.deleteMany();
        await Album.deleteMany();

        const lista3 = await Band.find();
        const lista4 = await Album.find();

        //await client.connection.close();
    } catch (e) {
        console.error(e);
    }
}
