import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';

describe('AppComponent', () => {
	let app: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent, MainChatComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		app = fixture.componentInstance;
	});
	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it(`should have as title 'client-app'`, () => {
		expect(app.title).toEqual('client-app');
	});
});
