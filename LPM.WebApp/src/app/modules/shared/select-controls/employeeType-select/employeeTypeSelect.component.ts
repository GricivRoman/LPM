import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeTypeSelectService } from './employeeTypeSelect.service';

@Component({
	selector: 'app-select-employee-type',
	template: `
        <app-select-single
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select-single>
    `,
	providers:[EmployeeTypeSelectService]
})
export class EmployeeTypeSelectComponent {

	@Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	constructor(public selectService: EmployeeTypeSelectService){
	}
}