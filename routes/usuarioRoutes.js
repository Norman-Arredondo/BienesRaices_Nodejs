import express from 'express';
import { formularioLogin, formularioRegistro, formularioOlvidePassword} from '../controllers/usuarioController.js';

const router = express.Router();

//Routing
/*
router.get('/', function(req, res){
    res.send('Hola mundo en Express');
});
*/

router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.get('/olvide-password', formularioOlvidePassword);


 
export default router;