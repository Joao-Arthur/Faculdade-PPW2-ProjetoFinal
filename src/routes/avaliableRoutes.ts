import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    res.send({
        rotas: {
            healthcheck: {
                queryParams: [],
                url: `${url}/healthcheck`
            },
            rankingbandasderock: {
                queryParams: ['ranking', 'cidade', 'regiao', 'ano'],
                url: `${url}/rankingbandasderock`
            },
            cursos: {
                queryParams: ['curso'],
                url: `${url}/cursos`
            }
        },
        api: {
            versao: '1.0',
            url: 'https://github.com/Joao-Arthur/Projeto_PPW2'
        },
        autor: {
            nome: 'João Arthur',
            url: 'https://github.com/Joao-Arthur/'
        }
    });
});

export default router;
