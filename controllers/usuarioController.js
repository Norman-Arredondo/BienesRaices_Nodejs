import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'

    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()

    });
}

//Como vamos a interactuar con la BD vamos a hacer la función asyncrona
const registrar = async (req, res) => {
    //Validación
    await check('nombre').notEmpty().withMessage('El campo nombre no puede ir vacío').run(req);
    await check('email').isEmail().withMessage('Ingresa un Email válido').run(req);
    await check('password').isLength({ min: 6, max: 6 }).withMessage('La contraseña debe de ser de exactamente 6 caracteres').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('La contraseña no es la misma').run(req);

    let resultado = validationResult(req); //Guarda el resultado de la validación

    //Verificar que el resultado este vacío
    if (!resultado.isEmpty()) {
        //Hay errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    //Extraer los datos 
    const { nombre, email, password } = req.body;
    // Verificar que el usuario no esté duplicado 
    //where: columna email de la BD {email: req.body.email}
    const existeUsuario = await Usuario.findOne({ where: { email: email } })
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario ya está registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }


    //Almcacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId() //Se encuentra en helpers
    });

    // Envía email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });


    //Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un Email de confirmación, presiona en el enlace'
    });

}

//Función que comprueba una cuenta
const confirmar = async (req, res) => {
    const { token } = req.params;
    //console.log(req.params.token);
    // Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }


    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    return res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
    });


    console.log(usuario)

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices',
        csrfToken: req.csrfToken(),

    });
}

const resetPassword = async (req, res) => {
    //Validación
    await check('email').isEmail().withMessage('Ingresa un Email válido').run(req);

    let resultado = validationResult(req); //Guarda el resultado de la validación

    //Verificar que el resultado este vacío
    if (!resultado.isEmpty()) {
        //Hay errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    //Buscar el usuario
    const {email} = req.body
    const usuario = await Usuario.findOne({ where: {email}});
    if(!usuario){
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningún usuario'}]
        });
    }

    //Generar un token y enviar un email
    usuario.token = generarId();
    await usuario.save();

    //Enviar un email
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    });
    //Renderizar un email
     //Mostrar mensaje de confirmación
     res.render('templates/mensaje', {
        pagina: 'Reestablece tu password',
        mensaje: 'Hemos enviado un Email con las instrucciones'
    });
}

const comprobarToken = (req, res, next) => {

}

const nuevoPassword = () => {

}

export {
    formularioLogin,
    formularioRegistro,
    confirmar,
    formularioOlvidePassword,
    registrar,
    resetPassword,
    comprobarToken,
    nuevoPassword
}