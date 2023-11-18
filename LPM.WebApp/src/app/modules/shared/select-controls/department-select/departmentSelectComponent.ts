import { Component, ViewChild, Inject } from '@angular/core';
import { DepartmentSelectService } from './departmentSelect.service';
import { DataService } from '../../services/data.service';
import { SelectComponent } from '../../module-frontend/forc-select/select-single/select.component';
import { BaseSelector} from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-department',
	template: `
		<app-select
			[label]="label"
			[control]="control"
			[selectService]="selectService"
			[isMultiple]="isMultiple"
		></app-select>
	`,
	providers:[{ provide: 'SelectService', useClass: DepartmentSelectService }, { provide: 'DS_DataService', useClass: DataService }]
})
export class DepartmentSelectComponent extends BaseSelector {
	@ViewChild(SelectComponent, {static: false}) selector: SelectComponent;

	constructor(@Inject('SelectService') public override selectService: DepartmentSelectService){
		super(selectService);
	}

	resetSelectList(){
		this.selector.resetSelectList();
	}
}