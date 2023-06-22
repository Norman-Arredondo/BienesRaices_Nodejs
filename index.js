//Importar Express. Lo extrae, loasigna a una variable
const express = require('express');

//Crear la app. Mandamos a llamar
const app = express(); 



//Definir un puerto y arrancar el proyecto
const port = 3001; 
app.listen(port, () => {
    console.log(` El servidor está funcionando en el puerto ${port}`)
});