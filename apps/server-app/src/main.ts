import express from 'express';
import { Express } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { Application } from './app/app';
import { corsUrl, port } from './app/config';

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: corsUrl } });

server.listen(port, () => {
	console.log('listening on *:3000');
});

const application = new Application(app, io);
