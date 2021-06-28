import express from 'express';
import bandas from './routes/bandas';
import cursos from './routes/cursos';
import healthcheck from './routes/healthcheck';
import avaliableRoutes from './routes/avaliableRoutes';
const PORT = process.env.PORT || 8080;
const app = express();

app.use('/healthcheck', healthcheck);
app.use('/rankingbandasderock', bandas);
app.use('/cursos', cursos);
app.use('/', avaliableRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
