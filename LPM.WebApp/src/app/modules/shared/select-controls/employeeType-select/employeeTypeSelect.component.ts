import { Component, Inject } from '@angular/core';
import { EmployeeTypeSelectService } from './employeeTypeSelect.service';
import { SelectComponent } from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-employee-type',
	template: `
        <app-select-single
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select-single>
    `,
	providers:[{ provide: 'SelectService', useClass: EmployeeTypeSelectService }]
})
export class EmployeeTypeSelectComponent extends SelectComponent {

	constructor(@Inject('SelectService') public override selectService: EmployeeTypeSelectService){
		super(selectService)
	}
}