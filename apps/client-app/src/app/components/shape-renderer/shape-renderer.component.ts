import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import {
	ColorType,
	Shape,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { addShapesToCanvas } from '../../utils/fill-canvas';

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
	@Input() color: ColorType;

	public context!: CanvasRenderingContext2D;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.shape && this.context) {
			this.shape.color = this.color;
			this.render();
		}

		if (changes.color) {
			this.shape.color = this.color;
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
			addShapesToCanvas(this.context, this.shape);
		}
	}
}
