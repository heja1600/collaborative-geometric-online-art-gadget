import * as express from 'express';
import * as http from 'http';
import { Socket } from 'socket.io';
const app = express();
const server = http.createServer(app);
import { Server } from 'socket.io';

const io = new Server(server, { cors: { origin: '*' } });

import {
	ColorType,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Application, ColorManager, ShapeManager } from './app/app';

server.listen(3000, () => {
	console.log('listening on *:3000');
});

const application = new Application(io);
