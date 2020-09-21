import { Socket } from 'socket.io';

export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {

        console.log('Client disconnected');
        
    })

}

// * LISTEN TO MESSAGES
export const mensaje = ( cliente: Socket ) => {

    cliente.on('mensaje', ( payload : {de: string, cuerpo: string } ) => {

        console.log('Message received',payload);

    })

}