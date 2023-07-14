import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos

    //Enviar el email
    await transport.sendMail({
        from : 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en bienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienes raices.com</p>
            <p>Tu cuenta ya está lista, sólo debes confirmarla en el siguiente enlance:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu Cuenta</a> </p>

            <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
}

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos

    //Enviar el email
    await transport.sendMail({
        from : 'BienesRaices.com',
        to: email,
        subject: 'Reestablece tu password en bienesRaices.com',
        text: 'Reestablece tu password en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password en bienesraices.com</p>
            <p>Sigue el siguiente enlace para generar un password nuevo:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer Password</a> </p>

            <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
}

export {
    emailRegistro,
    emailOlvidePassword
}