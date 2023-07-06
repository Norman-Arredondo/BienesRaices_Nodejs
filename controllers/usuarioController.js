import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'

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
    await check('repetir_password').equals('password').withMessage('La contraseña no es la misma').run(req);

    let resultado = validationResult(req); //Guarda el resultado de la validación

    //Verificar que el resultado este vacío
    if(!resultado.isEmpty()) {
        //Hay errores
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta',
            errores: resultado.array()
        });
    }

    
    const usuario = await Usuario.create(req.body)
    res.json(usuario)
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