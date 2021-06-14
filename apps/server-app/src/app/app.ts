import {
	ColorType,
	Ellipse,
	Path,
	Rectangle,
	Shape,
	ShapeType,
	SocketEvents,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import {
	getRandomEllipse,
	getRandomPath,
	getRandomRectangle,
} from '@collaborative-geometric-online-art-gadget/utils';
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
		return this.colors[++this.index];
	}
}

const defaulShapeSettings: ShapeManagerSettings = {
	scaleRatio: 0.1,
	maxShapes: 40,
};

export interface ShapeManagerSettings {
	scaleRatio: number;
	maxShapes: number;
}

export const randomRange = (min: number, max: number): number => {
	return min + Math.random() * (max - min);
};

export class ShapeManager {
	private shapes: Shape[];
	constructor(
		private readonly server: Server,
		private settings?: ShapeManagerSettings
	) {
		this.settings = { ...defaulShapeSettings, ...settings };
		this.shapes = [];
	}

	reshape(shape: Shape) {
		switch (shape.type) {
			case ShapeType.RECTANGLE: {
				const rectangle = shape as Rectangle;
				shape = getRandomRectangle(
					rectangle.width,
					rectangle.height,
					this.settings.scaleRatio,
					rectangle.color
				);

				break;
			}
			case ShapeType.ELLIPSE: {
				const ellipse = shape as Ellipse;

				shape = {
					...getRandomEllipse(
						ellipse.radiusX,
						ellipse.radiusY,
						this.settings.scaleRatio,
						ellipse.color
					),
					...{ color: shape.color },
				};

				break;
			}
			case ShapeType.PATH: {
				const path = shape as Path;

				shape = {
					...getRandomPath(path.points, this.settings.scaleRatio, path.color),
					...{ color: shape.color },
				};
				break;
			}
		}
		return shape;
	}
	addShape(shape: Shape) {
		shape = this.reshape(shape);
		if (this.shapes.length === this.settings.maxShapes) {
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
