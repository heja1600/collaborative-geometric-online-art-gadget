import { Shape } from '..';
import { Client } from './client';
import { ColorType } from './colors';

export interface ChatInfoMessage {
	shapes: Shape[];
	clients: any[];
}

export interface NewShapeMessage {
	shape: Shape;
}

export interface ClientConnectMessage {
	client: Client;
}

export interface ClientDisconnectMessage {
	client: Client;
}

export enum SocketEvents {
	ADD_SHAPE = 'add_shape',
	UPDATE_SHAPES = 'update_shapes',
	ASSIGN_COLOR = 'assign_color',
}
