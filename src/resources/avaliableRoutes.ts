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
            band: {
                queryParams: [
                    'name',
                    'activeAt',
                    'foundation',
                    'dissolution',
                    'album',
                    'song'
                ],
                url: `${url}/band`
            },
            album: {
                queryParams: ['title', 'band', 'song', 'release'],
                url: `${url}/album`
            }
        },
        api: {
            versao: '1.0',
            url: 'https://github.com/Joao-Arthur/Faculdade-PPW2-ProjetoFinal'
        },
        autor: {
            nome: 'João Arthur',
            url: 'https://github.com/Joao-Arthur/'
        }
    });
});

export default router;
