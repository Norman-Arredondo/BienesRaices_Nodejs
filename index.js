import express from 'express' //ES modules 

//Crear la app. Mandamos a llamar
const app = express(); 

//Routing
app.get('/', function(req, res){
    res.send('Hola mundo en Express');
});
 
//Definir un puerto y arrancar el proyecto
const port = 3000; 
app.listen(port, () => {
    console.log(` El servidor está funcionando en el puerto ${port}`)
});