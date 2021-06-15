import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatInfoComponent } from '../../components/chat-info/chat-info.component';
import { ShapeRendererComponent } from '../../components/shape-renderer/shape-renderer.component';
import { ShapesRendererComponent } from '../../components/shapes-renderer/shapes-renderer.component';
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
				ShapeRendererComponent,
				ShapesRendererComponent,
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
