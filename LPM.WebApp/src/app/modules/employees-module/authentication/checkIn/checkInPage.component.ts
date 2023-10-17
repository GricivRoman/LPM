import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CheckInModel } from './checkInModel';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from 'src/app/modules/shared/module-frontend/forc-alert/alertDialogStates';

@Component({
	selector: 'app-check-in-page',
	templateUrl: 'checkInPage.component.html'
})
export class CheckInPageComponent implements OnInit {
	model: CheckInModel;
	checkInButtonDisabled = true;

	form = new FormGroup({
		userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, Validators.email]),
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
			this.checkInButtonDisabled = !this.form.valid;
		});
	}

	backToLogin(){
		this.router.navigate(['auth/login'], { queryParams: {
			returlUrl: this.route.snapshot.queryParams['returlUrl']
		}});
	}

	checkIn(){
		if(this.form.valid){
			this.authenticationService.checkIn(this.form).subscribe({
				error: (errResponse: HttpErrorResponse) => {
					if(typeof errResponse.error === 'string' ) {
						this.alertService.showMessage(errResponse.error, AlertDialogStates.error);
					}
				}
			});
		}
	}
}