import {
	ShapeType,
	Ellipse,
	Rectangle,
	Path,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';

export const drawShapes = (
	context: CanvasRenderingContext2D,
	...shapes: Shape[]
): void => {
	shapes.forEach((shape) => {
		context.beginPath();
		switch (shape.type) {
			/** Ellipse */
			case ShapeType.ELLIPSE: {
				const ellipse = shape as Ellipse;
				context.beginPath();
				context.ellipse(
					ellipse.options.x * context.canvas.width,
					ellipse.options.y * context.canvas.height,
					ellipse.options.radiusX * context.canvas.width,
					ellipse.options.radiusY * context.canvas.height,
					Math.PI * 2,
					0,
					Math.PI * 2
				);
				break;
			}
			/** Rectangle */
			case ShapeType.RECTANGLE: {
				const rectangle = shape as Rectangle;
				context.rect(
					rectangle.options.x * context.canvas.width,
					rectangle.options.y * context.canvas.height,
					rectangle.options.width * context.canvas.width,
					rectangle.options.height * context.canvas.height
				);
				break;
			}
			/** Path */
			case ShapeType.PATH: {
				const path = shape as Path;
				if (path.options.points.length === 0) {
					break;
				}
				context.moveTo(
					path.options.points[0].x * context.canvas.width,
					path.options.points[0].y * context.canvas.height
				);
				path.options.points
					.slice(1)
					.forEach((point) =>
						context.lineTo(
							point.x * context.canvas.width,
							point.y * context.canvas.height
						)
					);

				break;
			}
		}
		if (shape.options.color) {
			context.fillStyle = shape.options.color as string;
			context.fill();
		}

		context.stroke();
	});
};
