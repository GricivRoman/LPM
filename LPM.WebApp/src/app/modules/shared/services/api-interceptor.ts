import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import config from '../../../../assets/configuration.json';
import { LocalStorageService } from '../local-storage/localStorage.service';
import { AuthResponse } from '../local-storage/auth-response';
const baseUrl = config.serverUrl;

@Injectable()
export class ApiInterceptor implements HttpInterceptor, OnDestroy {
	private authToken: string;
	private subscriprions: Subscription = new Subscription;

	constructor(private localStorageService: LocalStorageService) {
		this.subscriprions.add(this.localStorageService.$authInfo.subscribe((info: AuthResponse | null)=>{
			if(info){
				this.authToken = info.token;
			}
		}));
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiReq = req.clone({
			url: `${baseUrl}/${req.url}`,
			setHeaders: {
				'Accept'       : 'application/json',
				'Authorization': `Bearer ${this.authToken}`
			}
		});
		return next.handle(apiReq);
	}

	ngOnDestroy(): void {
		this.subscriprions.unsubscribe();
	}
}