import { Component, Inject, ViewChild } from '@angular/core';
import { EmployeeTypeSelectService } from './employeeTypeSelect.service';
import { SelectComponent } from '../../base-components/selectComponent';
import { SelectSingleComponent } from '../../module-frontend/forc-select/select-single/select-single.component';

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
	@ViewChild(SelectSingleComponent, {static: false}) selector: SelectSingleComponent;

	constructor(@Inject('SelectService') public override selectService: EmployeeTypeSelectService){
		super(selectService);
	}
}