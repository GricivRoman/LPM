import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ForcValidators {

	static earlierThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) >= date){
				return { 'earlierThan': `Дата должна быть раньше чем ${date.toLocaleDateString('ru')}` };
			}

			return null;
		};
	}

	static laterThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) <= date){
				return { 'laterThan': `Дата должна быть позже ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static earlierOrEqualThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) > date){
				return { 'earlierOrEqualThan': `Дата должна быть не позднее ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static laterOrEqualThan(date: Date): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control?.value && new Date(control.value) < date){
				return { 'laterOrEqualThan': `Дата должна быть не ранее ${date.toLocaleDateString('ru')}` };
			}
			return null;
		};
	}

	static greaterThan(num: any): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value <= num){
				return { 'greaterThan': `Значение должно быть больше ${num}` };
			}
			return null;
		};
	}

	static greaterOrEqualThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value < num){
				return { 'greaterOrEqualThan': `Значение должно быть не менее ${num}` };
			}
			return null;
		};
	}

	static lassThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value >= num){
				return { 'lassThan': `Значение должно быть меньше ${num}` };
			}
			return null;
		};
	}

	static lassOrEqualThan(num: number): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(control && control.value > num){
				return { 'lassOrEqualThan': `Значение должно быть не более ${num}` };
			}
			return null;
		};
	}

	static selectItemRequired(): ValidatorFn {
		return (control: AbstractControl) : ValidationErrors | null => {
			if(!control?.value?.id){
				return { 'selectItemRequired': 'Поле обязательно' };
			}
			return null;
		};
	}
}