import { Component } from '@angular/core';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from './modules/shared/local-storage/localStorage.service';
import { Router } from '@angular/router';
import { AuthResponse } from './modules/shared/local-storage/auth-response';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	authorized: boolean;
	profileMask = 'Unauthorized';

	constructor(private localStorageService: LocalStorageService,
    private router: Router) {
		localStorageService.$authInfo.subscribe((info: AuthResponse | null) => {
			this.authorized = info != null;
			this.profileMask = info != null ? info.userName : 'Unauthorized';
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

	protected title = 'ForcWebApp';
	protected carrotIcon = faCarrot;
}
