import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { EmployeeTypeSelectService } from './employeeTypeSelect.service';
import { SelectComponent } from '../../base-components/selectComponent';
import { SelectSingleComponent } from '../../module-frontend/forc-select/select-single/select-single.component';
import { SelectItem } from '../../models/selectItem';
import { EmployeeTypeEnumDictionary } from '../../enums/employeeTypeEnum';

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
export class EmployeeTypeSelectComponent extends SelectComponent implements OnInit {
	@ViewChild(SelectSingleComponent, {static: false}) selector: SelectSingleComponent;

	constructor(@Inject('SelectService') public override selectService: EmployeeTypeSelectService){
		super(selectService);
	}

	ngOnInit(){
		this.control.valueChanges.subscribe((employeeType) => this.setLocalEnumValue(employeeType));
	}

	setLocalEnumValue(employeeType: SelectItem){
		this.control.patchValue({
			id: employeeType.id,
			value: EmployeeTypeEnumDictionary.list.get(employeeType.id)
		}, {emitEvent: false});
	}
}