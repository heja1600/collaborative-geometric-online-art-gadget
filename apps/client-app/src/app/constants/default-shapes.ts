import {
	ColorType,
	Ellipse,
	Path,
	Rectangle,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import {
	normalizeElippse,
	normalizePath,
	normalizeRectangle,
} from '@collaborative-geometric-online-art-gadget/utils';

export const defaultShapes = [
	normalizeRectangle(
		new Rectangle({
			x: 0,
			y: 0,
			width: 1,
			height: 1,
			color: ColorType.GREEN,
		})
	),
	normalizeElippse(
		new Ellipse({
			x: 0.5,
			y: 0.5,
			radiusX: 0.5,
			radiusY: 0.5,
			color: ColorType.GREEN,
		})
	),
	normalizePath(
		new Path({
			points: [
				{ x: 0.5, y: 1 },
				{ x: 1, y: 0 },
				{ x: 0, y: 0 },
				{ x: 0.5, y: 1 },
			],

			color: ColorType.GREEN,
		})
	),
	normalizePath(
		new Path({
			points: [
				{ x: 0.5, y: 1 },
				{ x: 1, y: 0.75 },
				{ x: 1, y: 0.25 },
				{ x: 0.5, y: 0 },
				{ x: 0, y: 0.25 },
				{ x: 0, y: 0.75 },
				{ x: 0.5, y: 1 },
			],
		})
	),
	normalizePath(
		new Path({
			points: [
				{ x: 0, y: 0 },
				{ x: 100, y: 50 },
				{ x: 0, y: 90 },
				{ x: 0, y: 0 },
			],
		})
	),
	normalizePath(
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
		})
	),
	normalizePath(
		new Path({
			points: [
				{ x: 100, y: 10 },
				{ x: 40, y: 198 },
				{ x: 190, y: 78 },
				{ x: 10, y: 78 },
				{ x: 160, y: 198 },
				{ x: 100, y: 10 },
			],
		})
	),
	normalizeRectangle(
		new Rectangle({
			width: 10,
			height: 5,
			x: 0,
			y: 0,
		})
	),
];
