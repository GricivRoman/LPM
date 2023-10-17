import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginModel } from './loginModel';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from 'src/app/modules/shared/module-frontend/forc-alert/alertDialogStates';

@Component({
	selector: 'app-login-page',
	templateUrl: 'loginPage.component.html'
})
export class LoginPageComponent implements OnInit{
	model: LoginModel;
	loginButtonDisabled = true;

	form = new FormGroup({
		userNameOrEmail: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [Validators.required, Validators.minLength(7)])
	});

	constructor(protected router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
		private alertService: AlertService){
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe(() => {
			this.form.markAsTouched();
			this.loginButtonDisabled = !this.form.valid;
		});
	}

	login(){
		if(this.form.valid){
			this.authenticationService.login(this.form).subscribe({
				error: (errResponse: HttpErrorResponse) => {
					if(typeof errResponse.error === 'string' )
						this.alertService.showMessage(errResponse.error, AlertDialogStates.error);
				}
			});
		}
	}

	checkIn(){
		this.router.navigate(['auth/checkin'], { queryParams : {
			returnUrl: this.route.snapshot.queryParams['returnUrl']
		}});
	}
}