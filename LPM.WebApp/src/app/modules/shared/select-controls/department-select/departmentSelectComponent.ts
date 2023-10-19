import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentSelectService } from './departmentSelect.service';
import { DataService } from '../../services/data.service';
import { SelectSingleComponent } from '../../module-frontend/forc-select/select-single/select-single.component';

@Component({
	selector: 'app-select-department',
	template: `
		<app-select-single
			[label]="label"
			[control]="control"
			[selectService]="selectService"
		></app-select-single>
	`,
	providers:[DepartmentSelectService, { provide: 'DS_DataService', useClass: DataService }]
})
export class DepartmentSelectComponent {
	@ViewChild(SelectSingleComponent, {static: false}) selector: SelectSingleComponent;

	@Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	constructor(public selectService: DepartmentSelectService){
	}

	resetSelectList(){
		this.selector.resetSelectList();
	}
}