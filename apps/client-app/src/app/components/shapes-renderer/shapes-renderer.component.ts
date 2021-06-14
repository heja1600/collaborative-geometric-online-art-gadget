import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Shape } from '@collaborative-geometric-online-art-gadget/interfaces';
import { Subscription } from 'rxjs';
import { ShapeService } from '../../services/shape-service';
import { addShapesToCanvas } from '../../utils/fill-canvas';

@Component({
	selector: 'shapes-renderer',
	templateUrl: './shapes-renderer.component.html',
	styleUrls: ['./shapes-renderer.component.scss'],
})
export class ShapesRendererComponent
	implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('shapesCanvas', { static: false })
	shapesCanvas!: ElementRef<HTMLCanvasElement>;

	shapes: Shape[];

	public context!: CanvasRenderingContext2D;

	private onAddShapeSubscription: Subscription;
	private onShapesUpdateSubscription: Subscription;
	constructor(
		private readonly elementRef: ElementRef,
		private readonly shapeService: ShapeService
	) {
		this.shapes = [];
	}
	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.context = this.shapesCanvas.nativeElement.getContext('2d');
		this.updateCanvasDimensions();

		this.onShapesUpdateSubscription = this.shapeService
			.onShapesUpdate()
			.subscribe((shapes) => {
				this.shapes = shapes;
				this.clearShapes();
				this.renderShapes(this.shapes);
			});

		this.onAddShapeSubscription = this.shapeService
			.onAddShape()
			.subscribe((shape) => {
				this.shapes.push(shape);
				this.renderShapes([shape]);
			});
	}
	ngOnDestroy(): void {
		this.onAddShapeSubscription.unsubscribe();
		this.onShapesUpdateSubscription.unsubscribe();
	}
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.updateCanvasDimensions();
		this.renderShapes(this.shapes);
	}

	updateCanvasDimensions() {
		this.context.canvas.width = window.innerWidth;
		this.context.canvas.height = window.innerHeight;
	}

	renderShapes(shapes: Shape[]): void {
		if (
			typeof this.context !== 'undefined' &&
			typeof this.shapes !== 'undefined'
		) {
			addShapesToCanvas(this.context, ...shapes);
		}
	}

	clearShapes() {
		this.context.clearRect(
			0,
			0,
			this.context.canvas.width,
			this.context.canvas.height
		);
	}
}
