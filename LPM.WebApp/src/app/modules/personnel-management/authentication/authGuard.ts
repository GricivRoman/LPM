import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from '../../shared/local-storage/localStorage.service';

@Injectable()
export class AuthActivatorService{
	constructor(private authService: AuthenticationService,
        private router: Router,
        private localStorageService: LocalStorageService) {
	}

	CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
		if (this.authService.loginRequired) {
			this.localStorageService.clearAuthInfo();
			this.router.navigate(['auth/login'], { queryParams: {
				returnUrl: state.url
			}});

			return false;
		} else {
			return true;
		}
	}
}

export const AutGuard: CanActivateFn = (route, state) => {
	return inject(AuthActivatorService).CanActivate(route, state);
};