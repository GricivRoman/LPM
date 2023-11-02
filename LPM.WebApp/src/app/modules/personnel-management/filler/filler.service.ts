import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from '../../shared/module-frontend/forc-alert/alertDialogStates';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FillerService {
	private readonly _dataFromFileHasFilled$ = new Subject<void>;
	public readonly dataFromFileHasFilled$ = this._dataFromFileHasFilled$.asObservable();

	constructor(private http: HttpClient, private alertService: AlertService){
	}

	public save(selectedFile: File){
		const formData = new FormData();
		formData.append('File', selectedFile, selectedFile.name);

		this.http.post('primarily-filler', formData).subscribe({
			next: () => {
				this.alertService.showMessage('Первичное заполнение прошло успешно', AlertDialogStates.success);
				this._dataFromFileHasFilled$.next();
				this._dataFromFileHasFilled$.complete();
			},
			error: (err) => {
				console.error(err);
				this.alertService.showMessage(err, AlertDialogStates.error);
			}
		});
	}
}