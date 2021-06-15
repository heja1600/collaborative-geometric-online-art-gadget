import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatShapeComponent } from './chat-shape.component';

describe('ShapeRendererComponent', () => {
	let component: ChatShapeComponent;
	let fixture: ComponentFixture<ChatShapeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatShapeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatShapeComponent);
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
