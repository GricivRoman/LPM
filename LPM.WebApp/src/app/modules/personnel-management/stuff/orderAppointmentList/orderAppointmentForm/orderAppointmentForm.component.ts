import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { OrderAppointment } from '../orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentSelectComponent } from 'src/app/modules/shared/select-controls/department-select/departmentSelectComponent';
import { takeUntil } from 'rxjs';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-order-appointment-form',
	templateUrl: 'orderAppointmentForm.component.html',
	providers: [{provide: 'OrderAppointmenDataService', useClass: DataService}, AlertService]
})
export class OrderAppointmentFormComponent extends ReactiveFromComponent<OrderAppointment> implements AfterViewInit {
	@ViewChild(DepartmentSelectComponent, {static: false}) departmentSelector: DepartmentSelectComponent;

	constructor(
		@Inject('OrderAppointmenDataService') protected override dataService: DataService<OrderAppointment>,
		protected override alertService: AlertService,
		protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new OrderAppointment();
	}

	// TODO департамент задизейблен, пока не установлена организация
	override form = new FormGroup({
		organization: new FormControl<SelectItem>(new SelectItem()),
		department: new FormControl<SelectItem>({value: new SelectItem(), disabled: true}),
		dateStart: new FormControl(''),
		oficialDateStart: new FormControl(''),
		probationEndDate: new FormControl(''),
		dateEnd: new FormControl(''),
		position: new FormControl(''),
		employeeType: new FormControl('')
	});

	ngAfterViewInit(): void {
		this.setOrganizationInDepartmentSelector(this.form.controls.organization.value?.id);
		this.form.controls.organization.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((organization) => this.setOrganizationInDepartmentSelector(organization?.id));
	}

	setOrganizationInDepartmentSelector(id?: Guid){
		if(!id || this.departmentSelector.selectService.organizationId !== id){
			this.form.controls.department.reset();
			this.departmentSelector.selectService.organizationId = id;
			this.departmentSelector.resetSelectList();
		}
		
		if(id){
			this.form.controls.department.enable();
		} else {
			this.form.controls.department.disable();
		}
	}
}