import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ForcValidators {

	static earlierThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) >= date){
				return { 'earlierThan': `Date must be earlier than ${date.toLocaleDateString('ru')}` };
			}

			return null;
		};
	}

	static laterThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) <= date){
				return { 'laterThan': `Date must be later than ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static earlierOrEqualThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) > date){
				return { 'earlierOrEqualThan': `Date must be earlier or equal than ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static laterOrEqualThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) < date){
				return { 'laterOrEqualThan': `Date must be later or equal than ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static greaterThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value <= num){
				return { 'greaterThan': `Field must be greater than ${num}` };
			}
			return null;
		};
	}

	static greaterOrEqualThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value < num){
				return { 'greaterOrEqualThan': `Field must be greater or equal than ${num}` };
			}
			return null;
		};
	}

	static lassThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value >= num){
				return { 'lassThan': `Field must be less than ${num}` };
			}
			return null;
		};
	}

	static lassOrEqualThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value > num){
				return { 'lassOrEqualThan': `Field must be less or equal than ${num}` };
			}
			return null;
		};
	}
}