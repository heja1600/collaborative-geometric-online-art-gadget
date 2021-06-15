import { ColorType } from '@collaborative-geometric-online-art-gadget/interfaces';

export class ColorManager {
	private index;
	private colors: string[];
	constructor() {
		this.index = 0;
		this.colors = Object.values(ColorType);
	}

	getColor() {
		if (this.index + 1 === this.colors.length) {
			this.index = 0;
		}
		return this.colors[this.index++];
	}
}
