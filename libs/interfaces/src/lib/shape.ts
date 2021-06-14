import { ColorType } from './colors';

export enum ShapeType {
	ELLIPSE = 0,
	RECTANGLE = 1,
	TRIANGLE = 2,
	PATH = 3,
}

export interface Point {
	x: number;
	y: number;
}

export interface ShapeProperties {
	color?: ColorType;
}

export abstract class Shape implements ShapeProperties {
	abstract type: ShapeType;
	color: ColorType;
	constructor(options: ShapeProperties) {
		this.color = options.color;
	}
}

export interface EllipseProperties {
	radiusX: number;
	radiusY: number;
	x: number;
	y: number;
}

export class Ellipse extends Shape implements EllipseProperties {
	type: ShapeType = ShapeType.ELLIPSE;
	constructor(options: ShapeProperties & EllipseProperties) {
		super(options);
		this.radiusX = options.radiusX;
		this.radiusY = options.radiusY;
		this.x = options.x;
		this.y = options.y;
	}
	radiusX: number;
	radiusY: number;
	x: number;
	y: number;
}

export interface PathProperties {
	points: Point[];
}

export class Path extends Shape implements PathProperties {
	type: ShapeType = ShapeType.PATH;
	points: Point[];
	constructor(options: ShapeProperties & PathProperties) {
		super(options);
		this.points = options.points;
	}
}

export interface RectangleProperties {
	width: number;
	height: number;
	x: number;
	y: number;
}

export class Rectangle extends Shape implements RectangleProperties {
	type: ShapeType = ShapeType.RECTANGLE;
	width: number;
	height: number;
	x: number;
	y: number;
	constructor(options: ShapeProperties & RectangleProperties) {
		super(options);
		this.width = options.width;
		this.height = options.height;
		this.x = options.x;
		this.y = options.y;
	}
}

export interface TriangleProperties {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x3: number;
	y3: number;
}
export class Triangle extends Shape implements TriangleProperties {
	type: ShapeType = ShapeType.TRIANGLE;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x3: number;
	y3: number;
	constructor(options: ShapeProperties & TriangleProperties) {
		super(options);
		this.x1 = options.x1;
		this.y1 = options.y1;
		this.x2 = options.x2;
		this.y2 = options.y2;
		this.x3 = options.x3;
		this.y3 = options.y3;
	}
}
