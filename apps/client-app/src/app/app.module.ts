import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShapeRendererComponent } from './components/shape-renderer/shape-renderer.component';
import { ShapesRendererComponent } from './components/shapes-renderer/shapes-renderer.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';
import { ChatInfoComponent } from './components/chat-info/chat-info.component';

@NgModule({
	declarations: [
		AppComponent,
		MainChatComponent,
		ShapesRendererComponent,
		ShapeRendererComponent,
		ChatInfoComponent,
	],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
