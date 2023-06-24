import express from 'express';

const router = express.Router();

//Routing
/*
router.get('/', function(req, res){
    res.send('Hola mundo en Express');
});
*/

router.get('/login', (req, res ) => {
    res.render('auth/login');
});


 
export default router;