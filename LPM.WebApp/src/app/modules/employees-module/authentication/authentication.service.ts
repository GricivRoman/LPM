import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login/loginModel';
import { CheckInModel } from './checkIn/checkInModel';
import { LocalStorageService } from '../../shared/local-storage/localStorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiValidationErrorsResolvingService } from '../../shared/services/apiValidationErrorsResolving.service';
import { FormGroup } from '@angular/forms';
import { AuthResponse } from '../../shared/local-storage/auth-response';

@Injectable()
export class AuthenticationService {
	constructor(private http: HttpClient,
        private localStorageService: LocalStorageService,
        private router: Router,
        private route: ActivatedRoute,
		private errorsResolver: ApiValidationErrorsResolvingService){
	}

	get loginRequired(): boolean {
		return this.localStorageService.authInfo == null || new Date(this.localStorageService.authInfo.expiration) < new Date(Date.now());
	}


	login(form: FormGroup): Observable<any>{
		return this.loginRequest(form.value, form);
	}

	checkIn(form: FormGroup): Observable<any>{
		const model = form.value as CheckInModel;
		return this.http.post('account/checkin', model).pipe(map(() => {
			const loginModel: LoginModel = {
				userNameOrEmail: model.email,
				password: model.password
			};
			this.loginRequest(loginModel).subscribe();
		}), catchError(err => {
			this.errorsResolver.resolveApiValidationErrors(form, err);
			return throwError(err);
		}));
	}

	private loginRequest(model: LoginModel, form?: FormGroup): Observable<any>{
		return this.http.post('account/login', model).pipe(map((response) => {
			this.localStorageService.authInfo = response as AuthResponse;
			this.router.navigate([this.route.snapshot.queryParams['returnUrl']]);
		}), catchError(err => {
			if(form){
				this.errorsResolver.resolveApiValidationErrors(form, err);
			}
			return throwError(err);
		}));
	}
}