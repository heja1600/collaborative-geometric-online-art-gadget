import {
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
import { ColorManager } from '../utils/color.manager';

const defaulShapeSettings: ShapeControllerSettings = {
	scaleRatio: 0.1, // determing the maximum amount of size each shape should compared to 1:1 
	maxShapes: 40,
};

export interface ShapeControllerSettings {
	scaleRatio: number;
	maxShapes: number;
}

export class ShapeController {
	private shapes: Shape[];
	colorManager: ColorManager;
	constructor(
		private readonly server: Server,
		private settings?: ShapeControllerSettings
	) {
		this.settings = { ...defaulShapeSettings, ...settings };
		this.colorManager = new ColorManager();
		this.shapes = [];

		server.on('connection', (socket: Socket) => {
			console.log('a user connected');

			const color = this.colorManager.getColor();
			this.server.sockets.emit(SocketEvents.UPDATE_SHAPES, this.shapes);
			/** Assign color to the client */
			socket.emit(SocketEvents.ASSIGN_COLOR, color);

			/** Inform client about the shapes  */
			socket.emit(SocketEvents.UPDATE_SHAPES, this.getShapes());

			socket.on('add_shape', (shape: Shape) => {
				this.addShape(shape);
			});
		});
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
