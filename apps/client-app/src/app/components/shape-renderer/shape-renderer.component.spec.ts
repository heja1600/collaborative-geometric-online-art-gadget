import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShapeRendererComponent } from './shape-renderer.component';

describe('ShapeRendererComponent', () => {
	let component: ShapeRendererComponent;
	let fixture: ComponentFixture<ShapeRendererComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShapeRendererComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShapeRendererComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
