import express from 'express';
import dotenv from 'dotenv';
import healthcheck from './resources/healthcheck';
import avaliableRoutes from './resources/avaliableRoutes';
import { setupConnection } from './connection';

dotenv.config();
setupConnection();

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/healthcheck', healthcheck);
app.use('/', avaliableRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
