import cors from 'cors';
import { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { corsUrl, environment } from './config';
import { ShapeController } from './controllers/shape.controller';

export class Application {
    
	shapeManager: ShapeController;

	constructor(
		private readonly app: Express,
		private readonly socketServer: Server
	) {
		app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			if (environment === 'development') {
				return res.status(500).send(err.message);
			} else {
				/** Handle error */
			}
		});

		this.shapeManager = new ShapeController(socketServer);
	}
}
