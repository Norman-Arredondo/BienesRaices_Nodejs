import express from 'express';
import { formularioLogin } from '../controllers/usuarioController.js';

const router = express.Router();

//Routing
/*
router.get('/', function(req, res){
    res.send('Hola mundo en Express');
});
*/

router.get('/login', formularioLogin);


 
export default router;