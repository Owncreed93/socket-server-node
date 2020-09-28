import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {

        console.log('Client disconnected');
        
    })

}

// * LISTEN TO MESSAGES
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload : {de: string, cuerpo: string } ) => {

        console.log('Message received', payload);

        io.emit('mensaje-nuevo', payload );

    })


}

// * SET UP MESSAGES
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        console.log('Set up user : ', payload.nombre);

        callback({

            ok: true,

            mensaje: `User ${payload.nombre} has been set`

        })

    })

}