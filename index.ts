
import Server from "./classes/server";

import router  from "./routes/router";

//  * IMPORT PACKAGES
import bodyParser from "body-parser";

import cors from "cors";


// * SET UP SERVER
const server = new Server();

// * SET UP BODYPARSER
server.app.use( bodyParser.urlencoded( { extended: true } ) );

server.app.use( bodyParser.json() );

// * SET UP CORS
server.app.use( cors({ origin: true, credentials: true }) );

// * SERVICE'S ROUTES
server.app.use('/', router )

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})