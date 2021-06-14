import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	ColorType,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Subscription } from 'rxjs';
import { defaultShapes } from '../../constants/default-shapes';
import { ShapeService } from '../../services/shape-service';

@Component({
	selector: 'main-chat',
	templateUrl: './main-chat.component.html',
	styleUrls: ['./main-chat.component.scss'],
	providers: [ShapeService],
})
export class MainChatComponent implements OnInit, OnDestroy {
	defaultShapes = defaultShapes;
	color: ColorType;
	assignColorSubscription: Subscription;
	constructor(private readonly mainChatService: ShapeService) {}

	ngOnInit(): void {
		this.assignColorSubscription = this.mainChatService
			.onAssignColor()
			.subscribe((color) => (this.color = color));
	}

	onShapeClick(shape: Shape) {
		this.mainChatService.addShape(shape);
	}

	ngOnDestroy(): void {
		this.assignColorSubscription.unsubscribe();
	}
}
