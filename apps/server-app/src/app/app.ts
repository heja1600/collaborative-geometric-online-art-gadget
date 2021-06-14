import {
	ColorType,
	Shape,
	SocketEvents,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Server, Socket } from 'socket.io';

export class ColorManager {
	private index;
	private colors: string[];
	constructor() {
		this.index = 0;
		this.colors = Object.values(ColorType);
	}

	getColor() {
		if (this.index + 1 === this.colors.length) {
			this.index = 0;
		}
		return this.colors[this.index];
	}
}

export class ShapeManager {
	private shapes: Shape[];
	constructor(private readonly server: Server, private maxShapes = 40) {
		this.shapes = [];
	}

	addShape(shape: Shape) {
		if (this.shapes.length === this.maxShapes) {
			/** Update all shapes and inform clients */
			this.shapes = [shape];
			this.server.sockets.emit(SocketEvents.UPDATE_SHAPES, this.shapes);
		} else {
			/** Inform clients of the new shape */
			this.shapes.push(shape);
			this.server.sockets.emit(SocketEvents.ADD_SHAPE, shape);
		}
	}
	getShapes(): Shape[] {
		return this.shapes;
	}
}

export class Application {
	shapeManager: ShapeManager;
	colorManager: ColorManager;
	constructor(private server: Server) {
		this.colorManager = new ColorManager();
		this.shapeManager = new ShapeManager(server);

		server.on('connection', (socket: Socket) => {
			console.log('a user connected');

			const color = this.colorManager.getColor();

			/** Assign color to the client */
			socket.emit(SocketEvents.ASSIGN_COLOR, color);

			/** Inform client about the shapes  */
			socket.emit(SocketEvents.UPDATE_SHAPES, this.shapeManager.getShapes());

			socket.on('add_shape', (shape: Shape) => {
				this.shapeManager.addShape(shape);
			});
		});
	}
}
