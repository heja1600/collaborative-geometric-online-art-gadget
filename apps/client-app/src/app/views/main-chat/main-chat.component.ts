import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	ColorType,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Subscription } from 'rxjs';
import { defaultShapes } from '../../constants/default-shapes';
import { ShapeController } from '../../controllers/shape.controller';

@Component({
	selector: 'main-chat',
	templateUrl: './main-chat.component.html',
	styleUrls: ['./main-chat.component.scss'],
	providers: [ShapeController],
})
export class MainChatComponent implements OnInit, OnDestroy {
	defaultShapes = defaultShapes;
	color: ColorType;
	assignColorSubscription: Subscription;
	constructor(private readonly controller: ShapeController) {}

	ngOnInit(): void {
		this.assignColorSubscription = this.controller
			.onAssignColor()
			.subscribe((color) => (this.color = color));
	}

	onShapeClick(shape: Shape) {
		this.controller.addShape(shape);
	}

	ngOnDestroy(): void {
		this.assignColorSubscription.unsubscribe();
	}
}
