import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ApiValidationErrorsResolvingService {
	resolveApiValidationErrors(form: FormGroup, errResponse: HttpErrorResponse) {
		Object.keys(form.controls).forEach(controlKey => {
			const errPropName = `${controlKey[0].toUpperCase()}${controlKey.substring(1)}`;
			const errs = errResponse?.error[errPropName];
			if(errs){
				const currentControl = Object(form.controls)[controlKey] as FormControl;
				currentControl.setErrors(errs);
				delete errResponse.error[errPropName];
			}
		});
	}
}