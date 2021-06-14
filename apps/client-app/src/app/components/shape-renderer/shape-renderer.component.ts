import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { Shape } from '@collaborative-geometric-online-art-gadget/interfaces';
import { drawShapes } from '../../common/fill-canvas';

@Component({
	selector: 'shape-renderer',
	templateUrl: './shape-renderer.component.html',
	styleUrls: ['./shape-renderer.component.scss'],
})
export class ShapeRendererComponent
	implements OnInit, AfterViewInit, OnChanges {
	@ViewChild('shapeCanvas', { static: false })
	shapeCanvas!: ElementRef<HTMLCanvasElement>;
	@Input() shape: Shape;

	public context!: CanvasRenderingContext2D;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.shape && this.context) {
			this.render();
		}
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.context = this.shapeCanvas.nativeElement.getContext(
			'2d'
		) as CanvasRenderingContext2D;
		this.render();
	}

	render() {
		if (
			typeof this.context !== 'undefined' &&
			typeof this.shape !== 'undefined'
		) {
			drawShapes(this.context, this.shape);
		}
	}
}
