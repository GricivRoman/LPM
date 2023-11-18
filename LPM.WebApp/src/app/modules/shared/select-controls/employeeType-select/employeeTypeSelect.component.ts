import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { EmployeeTypeSelectService } from './employeeTypeSelect.service';
import { BaseSelector} from '../../base-components/selectComponent';
import { SelectComponent } from '../../module-frontend/forc-select/select-single/select.component';
import { SelectItem } from '../../models/selectItem';
import { EmployeeTypeEnumDictionary } from '../../enums/employeeTypeEnum';

@Component({
	selector: 'app-select-employee-type',
	template: `
		<app-select
			[label]="label"
			[control]="control"
			[selectService]="selectService"
			[isMultiple]="isMultiple"
		></app-select>
	`,
	providers:[{ provide: 'SelectService', useClass: EmployeeTypeSelectService }]
})
export class EmployeeTypeSelectComponent extends BaseSelector implements OnInit {
	@ViewChild(SelectComponent, {static: false}) selector: SelectComponent;

	constructor(@Inject('SelectService') public override selectService: EmployeeTypeSelectService){
		super(selectService);
	}

	ngOnInit(){
		this.control.valueChanges.subscribe((employeeTypes) => this.setLocalEnumValue(employeeTypes));
	}

	setLocalEnumValue(employeeTypes: SelectItem | SelectItem[]){
		if(this.isMultiple){
			(employeeTypes as SelectItem[]).map((employeeType: SelectItem) => {
				employeeType.value = EmployeeTypeEnumDictionary.list.get(employeeType.id) as string;
			});
			this.control.patchValue(employeeTypes, {emitEvent: false});
		} else {
			const employeeType = employeeTypes as SelectItem;
			this.control.patchValue({
				id: employeeType.id,
				value: EmployeeTypeEnumDictionary.list.get(employeeType.id)
			}, {emitEvent: false});
		}
	}
}