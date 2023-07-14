import express from 'express';
import { formularioLogin, formularioRegistro,registrar, confirmar, 
         formularioOlvidePassword, resetPassword, nuevoPassword,
         comprobarToken
        } from '../controllers/usuarioController.js';


const router = express.Router();

//Routing
/*
router.get('/', function(req, res){
    res.send('Hola mundo en Express');
});
*/

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);


//Almacena el nuevo Password
router.get('/olvide-password:/token', comprobarToken);
router.post('/olvide-password:/token', nuevoPassword);
 
export default router;