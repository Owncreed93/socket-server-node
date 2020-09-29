//  * PACKAGES
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

// *SOCKET FUNCTIONALITY
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    // * SERVER
    public app: express.Application;
    public port: number;

    // * EVENTS HANDLER
    public io: socketIO.Server;
    public httpServer: any = http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );

        this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }

    public static get instance() {

        return this._instance || ( this._instance = new this() );

    }

    private escucharSockets() {

        console.log('Listening to connections');

        this.io.on('connection', cliente  => {

            // * Connect client
            socket.conectarCliente( cliente );

            // * Set up server
            socket.configurarUsuario( cliente, this.io );

            // * Listening messages
            socket.mensaje( cliente, this.io );

            // * Disconnect
            socket.desconectar(cliente);

            

        })

    }

    start( callback: VoidFunction )  {

        this.httpServer.listen( this.port, callback )


    }

}
