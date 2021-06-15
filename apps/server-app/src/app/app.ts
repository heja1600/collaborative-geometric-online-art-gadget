import { Express } from 'express';
import { Server } from 'socket.io';
import { ShapeController } from './controllers/shape.controller';

export class Application {
	shapeManager: ShapeController;

	constructor(
		private readonly app: Express,
		private readonly socketServer: Server
	) {
		this.shapeManager = new ShapeController(socketServer);
	}
}
