import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { defaultShapes } from '../../constants/default-shapes';
import { ShapeController } from '../../controllers/shape.controller';
import { ShapesRendererComponent } from './shapes-renderer.component';

describe('ShapesRendererComponent', () => {
	let component: ShapesRendererComponent;
	let fixture: ComponentFixture<ShapesRendererComponent>;
	let controller: ShapeController;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShapesRendererComponent],
			providers: [ShapeController],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(ShapesRendererComponent);
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
