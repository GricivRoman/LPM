import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {
	constructor(private dialog: MatDialog){
	}

	openYesNoDialog(message: string, height: string = '120px', width: string = '400px'): Observable<boolean>{
		const dialogRef = this.dialog.open(DialogComponent, {
			data: message,
			hasBackdrop: true,
			height: height,
			width: width,
			ariaModal: true,
			id: 'yesNoDialog'
		});

		return dialogRef.afterClosed();
	}
}