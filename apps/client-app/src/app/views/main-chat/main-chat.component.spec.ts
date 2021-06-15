import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatInfoComponent } from '../../components/chat-info/chat-info.component';
import { ChatShapeComponent } from '../../components/chat-shape/chat-shape.component';
import { ShapeSurfaceComponent } from '../../components/shape-surface/shape-surface.component';
import { ShapeController } from '../../controllers/shape.controller';
import { MainChatComponent } from './main-chat.component';

describe('MainChatComponent', () => {
	let component: MainChatComponent;
	let fixture: ComponentFixture<MainChatComponent>;
	let controller: ShapeController;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MainChatComponent,
				ChatShapeComponent,
				ShapeSurfaceComponent,
				ChatInfoComponent,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [ShapeController],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainChatComponent);
		component = fixture.componentInstance;
		controller = TestBed.inject(ShapeController);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should contain chat shapes', () => {
		expect(
			fixture.nativeElement.querySelector('[data-test="chat-shapes"]')
		).toBeTruthy();
	});
	it('should ccontain shapes renderer', () => {
		expect(
			fixture.nativeElement.querySelector('[data-test="shapes-renderer"]')
		).toBeTruthy();
	});
	it('should create chat info', () =>
		expect(
			fixture.nativeElement.querySelector('[data-test="chat-info"]')
		).toBeTruthy());
	it('should display shape items', () => {
		expect(
			fixture.nativeElement.querySelectorAll('[data-test="shape-item"]').length
		).toBe(component.defaultShapes.length);
	});
});
