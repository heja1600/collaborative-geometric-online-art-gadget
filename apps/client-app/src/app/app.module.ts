import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatInfoComponent } from './components/chat-info/chat-info.component';
import { ChatShapeComponent } from './components/chat-shape/chat-shape.component';
import { ShapeSurfaceComponent } from './components/shape-surface/shape-surface.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';

@NgModule({
	declarations: [
		AppComponent,
		ShapeSurfaceComponent,
		ChatShapeComponent,
		ChatInfoComponent,
		MainChatComponent,
	],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
