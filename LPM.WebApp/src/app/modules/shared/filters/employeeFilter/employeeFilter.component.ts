import { Component, ViewChild } from '@angular/core';
import { DepartmentSelectModule } from '../../select-controls/department-select/departmentSelect.module';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from '../../models/selectItem';
import { Guid } from 'guid-typescript';
import { DepartmentSelectComponent } from '../../select-controls/department-select/departmentSelectComponent';
import { OrganizationSelectModule } from '../../select-controls/organization-select/organizationSelect.module';

@Component({
	selector: 'employee-filter',
	templateUrl: 'employeeFilter.component.html',
	standalone: true,
	imports: [OrganizationSelectModule, DepartmentSelectModule]
})

export class EmployeeFilterComponent {
	// TODO Дублирование логики из реализованной OrderAppointmentFormComponent.
	// TODO Перенести всю логику в отдельный компонент, который будет содержать в себе связку Организация + отдел и логику их взаимодействия
	@ViewChild(DepartmentSelectComponent, {static: false}) departmentSelector: DepartmentSelectComponent;

	public form = new FormGroup({
		organization: new FormControl<SelectItem>(new SelectItem()),
		department: new FormControl<SelectItem>({ value: new SelectItem(), disabled: true }),
	});

	ngAfterViewInit(): void {
		this.form.controls.organization.valueChanges
			.subscribe((organization) => this.setOrganizationInDepartmentSelector(organization?.id));
	}

	setOrganizationInDepartmentSelector(id?: Guid){
		if(!id || this.departmentSelector.selectService.organizationId !== id){
			this.form.controls.department.reset();
			this.departmentSelector.selectService.organizationId = id;
			this.departmentSelector.resetSelectList();
		}

		if(id){
			this.form.controls.department.enable({emitEvent: false});
		} else {
			this.form.controls.department.disable();
		}
	}
}