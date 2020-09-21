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