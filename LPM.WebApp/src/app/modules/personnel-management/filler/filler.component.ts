import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from '../../shared/module-frontend/forc-alert/alertDialogStates';

@Component({
	selector: 'app-filler',
	templateUrl: 'filler.component.html'
})
export class FillerComponent {
	constructor(private http: HttpClient, private alertService: AlertService){

	}

	public selectedFile: File;

	public fileChanges(event: any){
		const filesList = event.target.files;
		if(filesList){
			this.selectedFile = filesList[0];
		}
	}

	public save(){
		const formData = new FormData();
		formData.append('File', this.selectedFile, this.selectedFile.name);

		this.http.post('primarily-filler', formData).subscribe({
			next: () => {
				this.alertService.showMessage('Первичное заполнение прошло успешно', AlertDialogStates.success);
			},
			error: (err) => {
				console.error(err);
				this.alertService.showMessage(err, AlertDialogStates.error);
			}
		});
	}
}