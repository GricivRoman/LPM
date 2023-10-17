import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from '../module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from '../module-frontend/forc-alert/alertDialogStates';

@Injectable()
export class FileStorageService {
	public url: string;

	constructor(private http: HttpClient, private alertService: AlertService){
	}

	public get(id: Guid): Observable<FormData>{
		return this.http.get<FormData>(`${this.url}/photo/${id}`).pipe(catchError(err => {
			console.error(err);
			this.alertService.showMessage('Unable to download image', AlertDialogStates.error);
			return throwError(() => new Error(err));
		}));
	}

	public save(model: FormData){
		return this.http.post(`${this.url}/photo`, model).pipe(catchError(err => {
			console.error(err);
			this.alertService.showMessage('Unable to upload image', AlertDialogStates.error);
			return throwError(() => new Error(err));
		}));
	}
}