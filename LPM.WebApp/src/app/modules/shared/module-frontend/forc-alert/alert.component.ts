import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-alert',
	template:`
        <mat-dialog-content>
            <h5>{{message}}</h5>
        </mat-dialog-content>
        `,
	styleUrls: ['alert.component.css'],
	standalone: true,
	imports: [MatDialogModule]
})
export class AlertComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public message: string){
	}
}