import { Component, ViewChild, Inject } from '@angular/core';
import { DepartmentSelectService } from './departmentSelect.service';
import { DataService } from '../../services/data.service';
import { SelectSingleComponent } from '../../module-frontend/forc-select/select-single/select-single.component';
import { SelectComponent } from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-department',
	template: `
		<app-select-single
			[label]="label"
			[control]="control"
			[selectService]="selectService"
		></app-select-single>
	`,
	providers:[{ provide: 'SelectService', useClass: DepartmentSelectService }, { provide: 'DS_DataService', useClass: DataService }]
})
export class DepartmentSelectComponent extends SelectComponent {
	@ViewChild(SelectSingleComponent, {static: false}) selector: SelectSingleComponent;

	constructor(@Inject('SelectService') public override selectService: DepartmentSelectService){
		super(selectService);
	}

	resetSelectList(){
		this.selector.resetSelectList();
	}
}