import express from 'express' //ES modules 
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app. Mandamos a llamar
const app = express(); 

//Routing
app.use('/', usuarioRoutes);

//Definir un puerto y arrancar el proyecto
const port = 3000; 
app.listen(port, () => {
    console.log(` El servidor está funcionando en el puerto ${port}`)
});

