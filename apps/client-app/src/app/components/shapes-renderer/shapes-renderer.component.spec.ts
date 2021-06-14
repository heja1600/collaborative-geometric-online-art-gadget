import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesRendererComponent } from './shapes-renderer.component';

describe('ShapesRendererComponent', () => {
	let component: ShapesRendererComponent;
	let fixture: ComponentFixture<ShapesRendererComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShapesRendererComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShapesRendererComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
