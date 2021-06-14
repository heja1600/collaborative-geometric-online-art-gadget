import { Component } from '@angular/core';
import { Rectangle } from '@collaborative-geometric-online-art-gadget/interfaces';
import { normalizeRectangle } from '@collaborative-geometric-online-art-gadget/utils';

@Component({
	selector: 'collaborative-geometric-online-art-gadget-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'client-app';
	constructor() {}
}
