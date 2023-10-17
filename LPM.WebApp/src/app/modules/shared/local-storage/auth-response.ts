import { Guid } from 'guid-typescript';

export class AuthResponse {
	token: string;
	expiration: Date;
	userId: Guid;
	userName: string;
	roles : string[];
}