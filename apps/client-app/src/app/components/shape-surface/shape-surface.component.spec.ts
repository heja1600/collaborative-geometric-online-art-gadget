import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { defaultShapes } from '../../constants/default-shapes';
import { ShapeController } from '../../controllers/shape.controller';
import { ShapeSurfaceComponent } from './shape-surface.component';

describe('ShapesRendererComponent', () => {
	let component: ShapeSurfaceComponent;
	let fixture: ComponentFixture<ShapeSurfaceComponent>;
	let controller: ShapeController;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShapeSurfaceComponent],
			providers: [ShapeController],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(ShapeSurfaceComponent);
		component = fixture.componentInstance;
		controller = TestBed.inject(ShapeController);
		jest
			.spyOn(controller, 'onShapesUpdate')
			.mockImplementation(() => of(defaultShapes));
		fixture.detectChanges();
	});

	it('should display shape canvas', () => {
		expect(
			fixture.nativeElement.querySelectorAll('[data-test="shape-canvas"]')
		).toBeTruthy();
	});

	it('should contain same amount of shapes', async () => {
		expect(component.shapes.length).toEqual(defaultShapes.length);
	});
});
