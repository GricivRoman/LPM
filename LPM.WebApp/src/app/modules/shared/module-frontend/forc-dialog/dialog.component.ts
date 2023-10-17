import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog',
	template: `<mat-dialog-content>
                    <h5>{{message}}</h5>
                </mat-dialog-content>
                <mat-dialog-actions align="end">
                    <button class="btn btn-success" mat-button [mat-dialog-close]="true">Yes</button>
                    <button class="btn btn-outline-secondary mx-1" mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>`,
	standalone: true,
	imports: [MatDialogModule]
})
export class DialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public message: string){
	}
}