import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShapeController } from '../../controllers/shape.controller';
import { ChatInfoComponent } from './chat-info.component';

describe('ChatInfoComponent', () => {
	let component: ChatInfoComponent;
	let fixture: ComponentFixture<ChatInfoComponent>;
	let controller: ShapeController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatInfoComponent],
			providers: [ShapeController],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatInfoComponent);
		fixture.detectChanges();
		controller = TestBed.inject(ShapeController);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show shape counter', () => {
		expect(
			fixture.nativeElement.querySelector('[data-test="shape-counter"]')
		).toBeTruthy();
	});
});
