import express from 'express' //ES modules 
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';

//Crear la app. Mandamos a llamar
const app = express(); 

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}));

//Conexión a la Base de Datos
try{
    await db.authenticate();
    db.sync(); //Crea la tabla en caso que no está creada
    console.log('Conexión correcta a la BD')
} catch(error) {
    console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug'); //Establecemos que vamos a usar Pug
app.set('views', './views'); //Directorio donde se encuentra

//Carpeta Pública
app.use(express.static('public'));

//Routing
app.use('/auth', usuarioRoutes); //Todas las rutas con /auth

//Definir un puerto y arrancar el proyecto
const port = 3000; 
app.listen(port, () => {
    console.log(` El servidor está funcionando en el puerto ${port}`)
});

