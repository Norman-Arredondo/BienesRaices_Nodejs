import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'

const formularioLogin =  (req, res ) => {
    res.render('auth/login' , {
       pagina : 'Iniciar Sesión'
        
    });
}

const formularioRegistro =  (req, res ) => {
    res.render('auth/registro' , {
        pagina: 'Crear cuenta'
        
    });
}

//Como vamos a interactuar con la BD vamos a hacer la función asyncrona
const registrar = async (req, res) =>{
    //Validación
    await check('nombre').notEmpty().withMessage('El campo nombre no puede ir vacío').run(req);
    await check('email').isEmail().withMessage('Ingresa un Email válido').run(req);
    await check('password').isLength({min: 6, max: 6}).withMessage('La contraseña debe de ser de exactamente 6 caracteres').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('La contraseña no es la misma').run(req);

    let resultado = validationResult(req); //Guarda el resultado de la validación

    //Verificar que el resultado este vacío
    if(!resultado.isEmpty()) {
        //Hay errores
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    //Extraer los datos 
    const {nombre, email, password} = req.body;
    // Verificar que el usuario no esté duplicado 
    //where: columna email de la BD {email: req.body.email}
    const existeUsuario = await Usuario.findOne({where: {email : email}})
    if(existeUsuario){
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }
  
    
    //Almcacenar un usuario
    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId() //Se encuentra en helpers
    })
    
}

const formularioOlvidePassword =  (req, res ) => {
    res.render('auth/olvide-password' , {
        pagina: 'Recupera tu acceso a Bienes Raices'
        
    });
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}