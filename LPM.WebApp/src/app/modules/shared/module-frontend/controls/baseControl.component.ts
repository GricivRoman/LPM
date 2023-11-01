import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
	selector: 'app-base-control',
	template: ''
})
export class BaseControlComponent implements OnInit {
	public err: string;
	public shouldShowError: boolean;
	public controlIsOcupated: boolean;
	public controlRequired: boolean;

	@Input()
		label:string;

	@Input()
		control: FormControl;

	mapErrorMessage(err: ValidationErrors): string {
		const key = err[0];
		const errBody = err[1];
		switch(key){
		case 'required':
			return 'Поле обязательно';
		case 'minlength':
			return `Минимальная длинна ${errBody.requiredLength} символов`;
		case 'email':
			return 'Необходимо ввести e-mail';
		default:
			return errBody;
		}
	}

	ngOnInit(): void {
		this.control.valueChanges.subscribe(() => this.checkErrors());
		this.control.statusChanges.subscribe(() => this.checkErrors());
		this.checkRequired();
	}

	checkErrors() {
		this.shouldShowError = this.control.invalid && !this.controlIsOcupated;

		if(this.shouldShowError) {
			this.showError();
		}
	}

	showError() {
		const errors: ValidationErrors = this.control.errors as ValidationErrors;
		this.err = this.mapErrorMessage(Object.entries(errors)[0]);
	}

	onControlFocus() {
		this.controlIsOcupated = true;
	}

	onContolBlur() {
		this.controlIsOcupated = false;
		this.checkErrors();
	}

	checkRequired() {
		if(this.control.disabled){
			this.control.enable();
			this.checkValidation();
			this.control.disable();
		} else {
			this.checkValidation();
		}
	}

	private checkValidation(){
		const errors: ValidationErrors = this.control.errors as ValidationErrors;
		if(errors){
			if(Object.entries(this.control.errors as ValidationErrors).find(x => x[0] === 'required' || x[0] === 'selectItemRequired')){
				this.controlRequired = true;
			} else {
				this.controlRequired = false;
			}
		}
	}
}