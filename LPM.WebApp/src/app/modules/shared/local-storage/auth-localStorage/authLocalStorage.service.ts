import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { AuthResponse } from './auth-response';

@Injectable({providedIn: 'root'})
export class AuthLocalStorageService {
	$authInfo = new BehaviorSubject(this.authInfo);

	set authInfo(data: AuthResponse | null) {
		this.$authInfo.next(data);
		const value = JSON.stringify(data);
		localStorage.setItem('auth_info', value);
	}

	get authInfo(): AuthResponse | null{
		return JSON.parse(localStorage.getItem('auth_info') as string);
	}

	clearAuthInfo(){
		localStorage.removeItem('auth_info');
		this.$authInfo.next(null);
	}
}