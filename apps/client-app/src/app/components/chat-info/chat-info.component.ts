import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeService } from '../../services/shape-service';

@Component({
	selector: 'chat-info',
	templateUrl: './chat-info.component.html',
	styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit, OnDestroy {
	shapeCounter = 0;
	clientCounter = 0;

	onShapeAddSubscription: Subscription;
	onShapesUpdate: Subscription;
	constructor(private readonly shapeService: ShapeService) {}
	ngOnDestroy(): void {
		this.onShapeAddSubscription.unsubscribe();
		this.onShapeAddSubscription.unsubscribe();
	}

	ngOnInit(): void {
		this.onShapesUpdate = this.shapeService
			.onShapesUpdate()
			.subscribe((shapes) => (this.shapeCounter = shapes.length));

		this.onShapeAddSubscription = this.shapeService
			.onAddShape()
			.subscribe(() => this.shapeCounter++);
	}
}
