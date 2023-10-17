import { Component } from '@angular/core';
import { faAddressCard, faArrowRightToBracket, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from './modules/shared/local-storage/localStorage.service';
import { Router } from '@angular/router';
import { AuthResponse } from './modules/shared/local-storage/auth-response';

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

	constructor(private localStorageService: LocalStorageService,
    private router: Router) {
		localStorageService.$authInfo.subscribe((info: AuthResponse | null) => {
			this.authorized = info != null;
		});
	}

	logout(){
		this.localStorageService.clearAuthInfo();
		this.login('employees');
	}

	login(returnUrl: string = this.router.url){
		this.router.navigate(['auth/login'], {queryParams: {
			returnUrl: returnUrl
		}});
	}
}
