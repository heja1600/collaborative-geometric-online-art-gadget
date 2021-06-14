import { ColorType } from './colors';

export enum ShapeType {
	ELLIPSE = 0,
	RECTANGLE = 1,
	PATH = 2,
}

export interface Point {
	x: number;
	y: number;
}

export interface ShapeDefaults {
	color?: ColorType;
	username?: string;
}

export abstract class Shape {
	abstract type: ShapeType;
	options: ShapeDefaults;
}

export class Ellipse extends Shape {
	type: ShapeType = ShapeType.ELLIPSE;
	constructor(
		public options: ShapeDefaults & {
			radiusX: number;
			radiusY: number;
			x: number;
			y: number;
		}
	) {
		super();
	}
}

export class Path extends Shape {
	type: ShapeType = ShapeType.PATH;
	constructor(public options: ShapeDefaults & { points: Point[] }) {
		super();
	}
}

export class Rectangle extends Shape {
	type: ShapeType = ShapeType.RECTANGLE;
	constructor(
		public options: ShapeDefaults & {
			width: number;
			height: number;
			x: number;
			y: number;
		}
	) {
		super();
	}
}
