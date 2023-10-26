import { Component } from '@angular/core';
import { faAddressCard, faArrowRightToBracket, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { AuthLocalStorageService } from './modules/shared/local-storage/auth-localStorage/authLocalStorage.service';
import { Router } from '@angular/router';
import { AuthResponse } from './modules/shared/local-storage/auth-localStorage/auth-response';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	authorized: boolean;

	protected title = 'ForcWebApp';
	protected mainIcon = faAddressCard;
	protected loginIcon = faDoorClosed;
	protected logoutIcon = faArrowRightToBracket;

	constructor(private authLocalStorageService: AuthLocalStorageService,
    private router: Router) {
		authLocalStorageService.$authInfo.subscribe((info: AuthResponse | null) => {
			this.authorized = info != null;
		});
	}

	logout(){
		this.authLocalStorageService.clearAuthInfo();
		this.login('employees');
	}

	login(returnUrl: string = this.router.url){
		this.router.navigate(['auth/login'], {queryParams: {
			returnUrl: returnUrl
		}});
	}
}
