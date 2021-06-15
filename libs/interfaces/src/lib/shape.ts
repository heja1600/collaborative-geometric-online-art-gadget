import { ColorType } from './colors';

export enum ShapeType {
	ELLIPSE = 0,
	RECTANGLE = 1,
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
