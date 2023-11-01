import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { OrderAppointment } from '../orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentSelectComponent } from 'src/app/modules/shared/select-controls/department-select/departmentSelectComponent';
import { takeUntil } from 'rxjs';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';
import { Guid } from 'guid-typescript';
import { EmployeeTypeEnumDictionary } from 'src/app/modules/shared/enums/employeeTypeEnum';
import { EmployeeTypeSelectComponent } from 'src/app/modules/shared/select-controls/employeeType-select/employeeTypeSelect.component';
import { ForcValidators } from 'src/app/modules/shared/validation/forcValidators';

@Component({
	selector: 'app-order-appointment-form',
	templateUrl: 'orderAppointmentForm.component.html',
	providers: [{provide: 'OrderAppointmenDataService', useClass: DataService}, AlertService]
})
export class OrderAppointmentFormComponent extends ReactiveFromComponent<OrderAppointment> implements AfterViewInit {
	@ViewChild(DepartmentSelectComponent, {static: false}) departmentSelector: DepartmentSelectComponent;
	@ViewChild(EmployeeTypeSelectComponent, {static: false}) employeeTypeSelector: EmployeeTypeSelectComponent;

	public employeeId: Guid;

	constructor(
		@Inject('OrderAppointmenDataService') protected override dataService: DataService<OrderAppointment>,
		protected override alertService: AlertService,
		protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new OrderAppointment();
	}

	override form = new FormGroup({
		organization: new FormControl<SelectItem>(new SelectItem(), [ForcValidators.selectItemRequired()]),
		department: new FormControl<SelectItem>({ value: new SelectItem(), disabled: true }, [ForcValidators.selectItemRequired()]),
		dateStart: new FormControl<Date | null>(null, [Validators.required]),
		oficialDateStart: new FormControl<Date | null>(null),
		probationEndDate: new FormControl<Date | null>(null),
		dateEnd: new FormControl<Date | null>(null),
		position: new FormControl('', [Validators.required]),
		employeeType: new FormControl<SelectItem>(new SelectItem(), [ForcValidators.selectItemRequired()])
	});

	ngAfterViewInit(): void {
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
			this.form.controls.department.enable({emitEvent: false});
		} else {
			this.form.controls.department.disable();
		}
	}

	override initFrom(data: OrderAppointment): void {
		this.departmentSelector.selectService.organizationId = this.model.organization.id;
		super.initFrom(data);

		const employeeTypeId = this.form.controls.employeeType.value?.id;
		if(employeeTypeId){
			const employeeSelectItem = { id: employeeTypeId, value: EmployeeTypeEnumDictionary.list.get(employeeTypeId) as string };
			this.form.controls.employeeType.setValue(employeeSelectItem);
			this.employeeTypeSelector.selector.selectList = [employeeSelectItem];
		}
	}
}