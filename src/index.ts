import express from 'express';
import dotenv from 'dotenv';
import bandas from './resources/bandas';
import cursos from './resources/cursos';
import healthcheck from './resources/healthcheck';
import avaliableRoutes from './resources/avaliableRoutes';
import { setupConnection } from './connection';

dotenv.config();
setupConnection();

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/healthcheck', healthcheck);
app.use('/rankingbandasderock', bandas);
app.use('/cursos', cursos);
app.use('/', avaliableRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
