import {
	ColorType,
	Ellipse,
	Path,
	Point,
	Rectangle,
	Shape,
	ShapeType,
} from '@collaborative-geometric-online-art-gadget/interfaces';

/**
 * @description rescales width and height to fit given pixels
 * Solution found at {@link https://www.competoid.com/quiz_answers/14-0-59901/Question_answers/}
 * A little bit of because of rounding
 *  */
export const fitHeightAndWidth = (
	pixels: number,
	width: number,
	height: number
): {
	height: number;
	width: number;
} => {
	const x = Math.pow(pixels / (width * height), 0.5);
	return {
		width: width * x,
		height: height * x,
	};
};

/**
 * @description Normalization of points
 * @todo center normalized points
 */
export const normalizePoints = (...points: Point[]): Point[] => {
	/** Shift points to left right corner */
	const minY = points.reduce(
		(maxY, value) => (maxY < value.y ? maxY : value.y),
		points[0].y
	);
	const minX = points.reduce(
		(maxX, value) => (maxX < value.x ? maxX : value.x),
		points[0].x
	);

	points = points.map((point) => {
		return { x: point.x - minX, y: point.y - minY };
	});

	/** Get maximum value  */
	const maxY = points.reduce(
		(maxY, value) => (maxY > value.y ? maxY : value.y),
		points[0].y
	);

	const maxX = points.reduce(
		(maxX, value) => (maxX > value.x ? maxX : value.x),
		points[0].x
	);

	const max = maxX > maxY ? maxX : maxY;

	const largerThanOne = max > 1; // whether values should shrink or grow

	return points.map((value) => {
		return {
			x: largerThanOne ? value.x / max : (1 / max) * value.x,
			y: largerThanOne ? value.y / max : (1 / max) * value.y,
		};
	});
};

export const normalizePath = (path: Path) => {
	path.points = normalizePoints(...path.points);
	return path;
};

export const normalizeRectangle = (rectangle: Rectangle) => {
	/** Construct rectangle in terms of points */
	let points = [
		{ x: rectangle.x, y: rectangle.y },
		{ x: rectangle.x, y: rectangle.y + rectangle.height },
		{ x: rectangle.x + rectangle.width, y: rectangle.y + rectangle.height },
		{ x: rectangle.x + rectangle.width, y: rectangle.y },
	];

	points = normalizePoints(...points);

	/** Reconstruct rectangle */
	rectangle.height = points[2].y - points[0].y;
	rectangle.width = points[2].x - points[0].x;
	rectangle.x = points[0].x;
	rectangle.y = points[0].y;

	return rectangle;
};

/**
 * @todo finish
 */
export const normalizeElippse = (ellipse: Ellipse) => {
	let points = [
		{ x: ellipse.x, y: ellipse.y },
		{ x: ellipse.x, y: ellipse.y + ellipse.radiusY },
		{ x: ellipse.x + ellipse.radiusX, y: ellipse.y + ellipse.radiusY },
		{ x: ellipse.x + ellipse.radiusX, y: ellipse.y },
		{ x: ellipse.x, y: ellipse.y - ellipse.radiusY },
		{ x: ellipse.x - ellipse.radiusX, y: ellipse.y - ellipse.radiusY },
		{ x: ellipse.x - ellipse.radiusX, y: ellipse.y },
	];

	points = normalizePoints(...points);

	/** Reconstruct rectangle */
	ellipse.radiusY = points[2].y - points[0].y;
	ellipse.radiusX = points[2].x - points[0].x;
	ellipse.x = points[0].x;
	ellipse.y = points[0].y;

	return ellipse;
};

export const randomRange = (min: number, max: number) => {
	if (min > max) {
		throw Error(`min value of ${min} is greater than ${max}`);
	}

	return min + Math.random() * (max - min);
};

/**
 * Normalizes a shape
 * @param shapes
 * @returns
 */
export const normalizeShapes = (...shapes: Shape[]) => {
	shapes.forEach((shape) => {
		switch (shape.type) {
			case ShapeType.RECTANGLE: {
				shape = normalizeRectangle(shape as Rectangle);
				break;
			}
			case ShapeType.ELLIPSE: {
				shape = normalizeElippse(shape as Ellipse);
				break;
			}
			case ShapeType.PATH: {
				shape = normalizePath(shape as Path);
				break;
			}
			default: {
				throw new Error(`Shape with type: ${shape.type} is not supported`);
			}
		}
	});
	return shapes;
};
/**
 * @description Creates a random rectangle and keeps the height/width ratio
 * @param width
 * @param height
 * @param scale
 * @param color
 * @returns
 */
export const getRandomRectangle = (
	width: number,
	height: number,
	scale: number = 1,
	color?: ColorType
): Rectangle => {
	const ratio = height / width;

	const newWidth = randomRange(0, scale);

	return new Rectangle({
		x: randomRange(0, 1),
		y: randomRange(0, 1),
		width: newWidth,
		height: newWidth * ratio,
		color: color,
	});
};

/**
 * @description Creates a random ellipse and keeps the radius ratio
 */
export const getRandomEllipse = (
	radiusX: number,
	radiusY: number,
	scale: number = 1,
	color?: ColorType
): Ellipse => {
	const ratio = radiusX / radiusY;
	const newRadiusX = randomRange(0, scale);
	return new Ellipse({
		x: randomRange(0, 1),
		y: randomRange(0, 1),
		radiusX: newRadiusX,
		radiusY: newRadiusX * ratio,
		color: color,
	});
};

/**
 * @description Creates a random ellipse and keeps the radius ratio
 */
export const getRandomPath = (
	points: Point[],
	scale: number = 1,
	color?: ColorType
) => {
	const moveX = randomRange(0, 1);
	const moveY = randomRange(0, 1);
	points = points.map((point) => {
		return {
			x: point.x * scale + moveX,
			y: point.y * scale + moveY,
		};
	});
	return new Path({ points: points, color: color });
};
