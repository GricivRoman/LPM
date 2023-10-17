import { Injectable } from '@angular/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AlertComponent } from './alert.component';
import { AlertDialogStates } from './alertDialogStates';

@Injectable()
export class AlertService {
	constructor(private dialog: NgDialogAnimationService){
	}

	showMessage(message: string, alertDialogState: string = AlertDialogStates.success) {
		const showedDialogsCount = document.getElementsByClassName('alert-dialog').length;

		const dialogRef = this.dialog.open(AlertComponent, {
			data: message,

			hasBackdrop: false,
			ariaModal: true,
			maxWidth: '350px',
			maxHeight: '250px',
			panelClass: ['alert-dialog', alertDialogState],
			animation: {
				outgoingOptions: {
					keyframes: [
						{ opacity: 1 },
						{ opacity: 0.5 },
						{ opacity: 0 },
					],
					keyframeAnimationOptions: { id: `${showedDialogsCount+1}`, duration: 1500 },
				}
			},
			position: {
				right: '1rem',
				top: `${5*(showedDialogsCount+1)}rem`
			}
		});

		dialogRef.afterOpened().subscribe(() => {
			setTimeout(() => {
				dialogRef.close();
			}, 2500);
		});
	}
}