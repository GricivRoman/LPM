import { Component, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectService } from '../module-frontend/forc-select/select.service';

@Component({
	selector: 'app-select-component',
	template: ''
})
export class SelectComponent {
	@Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	@Input()
		disabled: boolean;

	constructor(@Inject('SelectService') public selectService: SelectService){
	}
}