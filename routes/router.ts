import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

// * TEST
/* | ------------------------------------------------------------------------------------------------------- | */

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Everything is fine'
    })

})

router.post('/mensajes', (req: Request, res: Response) => {

    

    const cuerpo = req.body.cuerpo;

    const de    = req.body.de;

    const payload = { de, cuerpo }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    })

})

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;

    const de    = req.body.de;

    const id    = req.params.id;

    const payload = {

        de,
        cuerpo

    }

    const server = Server.instance;

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })

})

/* | ------------------------------------------------------------------------------------------------------- | */

// * GET ALL USERS'S ID

router.get('/usuarios', ( req: Request, res: Response) => {

    const server = Server.instance;

    server.io.clients( (err: any , clientes: string[]) => {

        if ( err ) {

            res.json({

                ok: false,
                err

            })

        }

        res.json({

            ok: true,
            clientes

        })

    })

})


/* | ------------------------------------------------------------------------------------------------------- | */

// * GET ALL USERS AND NAMES

router.get('/usuarios/detalle', ( req: Request, res: Response) => {

    const clientes = usuariosConectados.getLista();

        res.json({

            ok: true,
            clientes

        })


})

/* | ------------------------------------------------------------------------------------------------------- | */

export default router;