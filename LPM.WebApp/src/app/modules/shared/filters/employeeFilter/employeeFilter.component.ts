import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { DepartmentSelectModule } from '../../select-controls/department-select/departmentSelect.module';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from '../../models/selectItem';
import { Guid } from 'guid-typescript';
import { DepartmentSelectComponent } from '../../select-controls/department-select/departmentSelectComponent';
import { OrganizationSelectModule } from '../../select-controls/organization-select/organizationSelect.module';
import { take } from 'rxjs';
import { ForcControlsModule } from '../../module-frontend/controls/forc-controls.module';
import { SexSelectModule } from '../../select-controls/sex-select/sexSelect.module';

@Component({
	selector: 'employee-filter',
	templateUrl: 'employeeFilter.component.html',
	standalone: true,
	imports: [OrganizationSelectModule, DepartmentSelectModule, ForcControlsModule, SexSelectModule]
})

export class EmployeeFilterComponent implements AfterViewInit {
	// TODO Дублирование логики из реализованной OrderAppointmentFormComponent.
	// TODO Перенести всю логику в отдельный компонент, который будет содержать в себе связку Организация + отдел и логику их взаимодействия
	@ViewChild(DepartmentSelectComponent, {static: false}) departmentSelector: DepartmentSelectComponent;

	public form = new FormGroup({
		organization: new FormControl<SelectItem>(new SelectItem()),
		department: new FormControl<SelectItem[]>({ value: [new SelectItem()], disabled: true }),
		ageDiapazoneStart: new FormControl<number | null>(null),
		ageDiapazoneEnd: new FormControl<number | null>(null),
		sex: new FormControl<SelectItem>(new SelectItem()),
		hasVMI: new FormControl<boolean>(false),
		position: new FormControl<SelectItem[]>([new SelectItem()]),
		positionType: new FormControl<SelectItem[]>([new SelectItem()]),
		dateStartPeriodStart: new FormControl<Date | null>(null),
		dateStartPeriodEnd: new FormControl<Date | null>(null),
		onProbationPeriod: new FormControl<boolean>(false),
		workLengthDiapazoneStart: new FormControl<number | null>(null),
		workLengthDiapazoneEnd: new FormControl<number | null>(null)
	});

	ngAfterViewInit(): void {
		this.form.controls.organization.valueChanges
			.pipe(take(1))
			.subscribe((organization) => this.initializeOrganizationInDepartmentSelector(organization?.id));

		this.form.controls.organization.valueChanges
			.subscribe((organization) => this.setOrganizationInDepartmentSelector(organization?.id));
	}

	initializeOrganizationInDepartmentSelector(id?: Guid){
		if(id){
			this.departmentSelector.selectService.organizationId = id;
			this.form.controls.department.enable({emitEvent: false});
		} else {
			this.form.controls.department.disable();
		}
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