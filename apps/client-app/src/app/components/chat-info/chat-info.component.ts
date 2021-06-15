import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeController } from '../../controllers/shape.controller';

@Component({
	selector: 'chat-info',
	templateUrl: './chat-info.component.html',
	styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit, OnDestroy {
	shapeCounter = 0;

	onShapeAddSubscription: Subscription;
	onShapesUpdate: Subscription;

	constructor(private readonly controller: ShapeController) {}
	ngOnDestroy(): void {
		this.onShapeAddSubscription.unsubscribe();
		this.onShapeAddSubscription.unsubscribe();
	}

	ngOnInit(): void {
		this.onShapesUpdate = this.controller
			.onShapesUpdate()
			.subscribe((shapes) => (this.shapeCounter = shapes.length));

		this.onShapeAddSubscription = this.controller
			.onAddShape()
			.subscribe(() => this.shapeCounter++);
	}
}
