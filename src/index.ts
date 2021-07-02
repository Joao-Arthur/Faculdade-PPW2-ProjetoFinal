import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthcheck from './resources/healthcheck';
import avaliableRoutes from './resources/avaliableRoutes';
import album from './resources/album';
import band from './resources/band';
import user from './resources/user';
import { setupConnection } from './connection';

dotenv.config();
setupConnection();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.path);
    next();
});

app.use('/healthcheck', healthcheck);
app.use('/album', album);
app.use('/band', band);
app.use('/user', user);
app.use('/', avaliableRoutes);

app.listen(PORT, () => {
    console.log(
        `Server started on port: ${PORT}

Avaliable routes

/healthcheck
/album
/band
/user
/user/login
/
`
    );
});
