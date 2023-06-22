import express from 'express';

const router = express.Router();

//Routing
router.get('/', function(req, res){
    res.send('Hola mundo en Express');
});

router.post('/', (req, res) => {
    res.json({msg: 'Respuesta de Tipo Post'});
});


 
export default router;


