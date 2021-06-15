import {
	ColorType,
	Ellipse,
	Path,
	Point,
	Rectangle,
	Shape,
	ShapeType,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { normalizeElippse, normalizeRectangle } from '..';
import { normalizePoints, randomRange } from './shape.utils';

export const testShapes: Shape[] = [
	new Rectangle({
		x: 0,
		y: 0,
		width: 1,
		height: 1,
		color: ColorType.GREEN,
	}),
	new Ellipse({
		x: 0.5,
		y: 0.5,
		radiusX: 0.5,
		radiusY: 50,
		color: ColorType.GREEN,
	}),
	new Ellipse({
		x: -50,
		y: 500,
		radiusX: 0.5,
		radiusY: 50,
		color: ColorType.GREEN,
	}),
	new Path({
		points: [
			{ x: 0.5, y: 1 },
			{ x: -5, y: 0 },
			{ x: 0, y: 0 },
			{ x: 0.5, y: -5 },
		],

		color: ColorType.GREEN,
	}),
	new Path({
		points: [
			{ x: 0.5, y: 1 },
			{ x: 1, y: 0.75 },
			{ x: 1, y: 0.25 },
			{ x: -2, y: 0 },
			{ x: 0, y: 0.25 },
			{ x: 0, y: 0.75 },
			{ x: 0.5, y: 1 },
		],
	}),
	new Path({
		points: [
			{ x: 0, y: 0 },
			{ x: 100, y: 50 },
			{ x: 0, y: 90 },
			{ x: 0, y: 0 },
		],
	}),
	new Path({
		points: [
			{ x: 159.0, y: 179.0 },
			{ x: 179.0, y: 193.641 },
			{ x: 176.321, y: 169.0 },
			{ x: 199.0, y: 159.0 },
			{ x: 176.321, y: 149.0 },
			{ x: 179.0, y: 124.359 },
			{ x: 159.0, y: 139.0 },
			{ x: 139.0, y: 124.359 },
			{ x: 141.679, y: 149.0 },
			{ x: 119.0, y: 159.0 },
			{ x: 141.679, y: 169.0 },
			{ x: 139.0, y: 193.641 },
			{ x: 159.0, y: 179.0 },
		],
	}),

	new Path({
		points: [
			{ x: -100, y: -10 },
			{ x: -40, y: -198 },
			{ x: -190, y: -78 },
			{ x: -10, y: -78 },
			{ x: -160, y: -198 },
			{ x: -100, y: -10 },
		],
	}),
	new Rectangle({
		width: 10,
		height: 5,
		x: -5,
		y: -2,
	}),
];

describe('shape.utils', () => {
	it('should normalize points', () => {
		const points: Point[] = testShapes
			.filter((shape) => shape.type === ShapeType.PATH)
			.reduce((res, path) => [...res, ...(path as Path).points], []);

		normalizePoints(...points).forEach((point) => {
			expect(point.x).toBeGreaterThanOrEqual(0);
			expect(point.x).toBeLessThanOrEqual(1);
			expect(point.y).toBeGreaterThanOrEqual(0);
			expect(point.y).toBeLessThanOrEqual(1);
		});
	});

	it('should normalize ellipse', () => {
		testShapes
			.filter((shape) => shape.type === ShapeType.ELLIPSE)
			.forEach((ellipse: Ellipse) => {
				ellipse = normalizeElippse(ellipse);
				expect(ellipse.x).toBeGreaterThanOrEqual(0);
				expect(ellipse.x).toBeLessThanOrEqual(1);
				expect(ellipse.y).toBeGreaterThanOrEqual(0);
				expect(ellipse.y).toBeLessThanOrEqual(1);
				expect(ellipse.radiusX).toBeGreaterThanOrEqual(0);
				expect(ellipse.radiusX).toBeLessThanOrEqual(0.5);
				expect(ellipse.radiusY).toBeGreaterThanOrEqual(0);
				expect(ellipse.radiusY).toBeLessThanOrEqual(0.5);
			});
	});

	it('should normalize rectangle', () => {
		testShapes
			.filter((shape) => shape.type === ShapeType.RECTANGLE)
			.forEach((rectangle: Rectangle) => {
				rectangle = normalizeRectangle(rectangle);
				expect(rectangle.x).toBeGreaterThanOrEqual(0);
				expect(rectangle.x).toBeLessThanOrEqual(1);
				expect(rectangle.y).toBeGreaterThanOrEqual(0);
				expect(rectangle.y).toBeLessThanOrEqual(1);
				expect(rectangle.width).toBeGreaterThanOrEqual(0);
				expect(rectangle.width).toBeLessThanOrEqual(1);
				expect(rectangle.height).toBeGreaterThanOrEqual(0);
				expect(rectangle.height).toBeLessThanOrEqual(1);
			});
	});

	it('should generate random number', () => {
		[
			[0, 5],
			[-5, 10],
			[10, 15],
		].forEach((pair) => {
			const random = randomRange(pair[0], pair[1]);
			expect(random).toBeGreaterThanOrEqual(pair[0]);
			expect(random).toBeLessThanOrEqual(pair[1]);
		});

		[
			[0, -1],
			[-5, -20],
			[10, -5],
		].forEach((pair) => {
			expect(() => {
				randomRange(pair[0], pair[1]);
			}).toThrowError();
		});
	});
});
