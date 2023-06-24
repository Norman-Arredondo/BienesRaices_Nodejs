import express from 'express' //ES modules 
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app. Mandamos a llamar
const app = express(); 

//Habilitar Pug
app.set('view engine', 'pug'); //Establecemos que vamos a usar Pug
app.set('views', './views'); //Directorio donde se encuentra

//Routing
app.use('/auth', usuarioRoutes); //Todas las rutas con /auth

//Definir un puerto y arrancar el proyecto
const port = 3000; 
app.listen(port, () => {
    console.log(` El servidor está funcionando en el puerto ${port}`)
});

