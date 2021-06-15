import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { Express } from 'express';
import { Application } from './app/app';

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });

server.listen(3000, () => {
	console.log('listening on *:3000');
});

const application = new Application(app, io);
