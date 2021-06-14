import {
	ShapeType,
	Ellipse,
	Rectangle,
	Path,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';

export const addShapesToCanvas = (
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
					ellipse.x * context.canvas.width,
					ellipse.y * context.canvas.height,
					ellipse.radiusX * context.canvas.width,
					ellipse.radiusY * context.canvas.height,
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
					rectangle.x * context.canvas.width,
					rectangle.y * context.canvas.height,
					rectangle.width * context.canvas.width,
					rectangle.height * context.canvas.height
				);
				break;
			}
			/** Path */
			case ShapeType.PATH: {
				const path = shape as Path;
				if (path.points.length === 0) {
					break;
				}
				context.moveTo(
					path.points[0].x * context.canvas.width,
					path.points[0].y * context.canvas.height
				);
				path.points
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

		if (shape.color) {
			context.fillStyle = shape.color as string;
			context.fill();
		}

		context.stroke();
	});
};
