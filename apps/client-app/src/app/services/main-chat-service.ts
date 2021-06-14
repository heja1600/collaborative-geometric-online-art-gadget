import { Injectable } from '@angular/core';
import {
	ColorType,
	Shape,
	SocketEvents,
} from '@collaborative-geometric-online-art-gadget/interfaces';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ShapeService {
	private readonly _onConnect: Subject<void>;
	private readonly socket: Socket;
	private readonly _onShapesUpdate: Subject<Shape[]>;
	private readonly _onAssignColor: Subject<ColorType>;
	private readonly _onAddShape: Subject<Shape>;
	constructor() {
		this._onConnect = new Subject();
		this._onShapesUpdate = new Subject();
		this._onAssignColor = new Subject();
		this._onAddShape = new Subject();

		this.socket = io('http://localhost:3000');

		this.socket.on('connect', () => {
			this.addEvents();
		});
	}

	private addEvents() {
		this.socket.on('disconnect', () => {
			console.log('disconnected');
		});

		/** Emits */
		this.socket.on(SocketEvents.ASSIGN_COLOR, (color) =>
			this._onAssignColor.next(color)
		);

		this.socket.on(SocketEvents.UPDATE_SHAPES, (shapes) =>
			this._onShapesUpdate.next(shapes)
		);

		this.socket.on(SocketEvents.ADD_SHAPE, (shape) =>
			this._onAddShape.next(shape)
		);
	}

	addShape(shape: Shape) {
		if (this.socket) {
			this.socket.emit('add_shape', shape);
		}
	}

	onShapesUpdate(): Observable<Shape[]> {
		return this._onShapesUpdate.asObservable();
	}

	onAssignColor(): Observable<ColorType> {
		return this._onAssignColor.asObservable();
	}

	onAddShape(): Observable<Shape> {
		return this._onAddShape.asObservable();
	}
}
