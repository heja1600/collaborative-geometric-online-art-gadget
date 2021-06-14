import { Component, OnInit } from '@angular/core';
import {
	ColorType,
	Ellipse,
	Path,
	Rectangle,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Observable } from 'rxjs';
import { ShapeService } from '../../services/main-chat-service';
export const defaultShapes = [
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
		radiusY: 0.5,
		color: ColorType.GREEN,
	}),
	new Path({
		points: [
			{ x: 0.5, y: 1 },
			{ x: 1, y: 0 },
			{ x: 0, y: 0 },
			{ x: 0.5, y: 1 },
		],
		color: ColorType.GREEN,
	}),
];

@Component({
	selector: 'main-chat',
	templateUrl: './main-chat.component.html',
	styleUrls: ['./main-chat.component.scss'],
	providers: [ShapeService],
})
export class MainChatComponent implements OnInit {
	defaultShapes = defaultShapes;
	constructor(private readonly mainChatService: ShapeService) {}

	ngOnInit(): void {}

	onShapeClick(shape: Shape) {
		console.log(shape);
		this.mainChatService.addShape(shape);
	}
}
