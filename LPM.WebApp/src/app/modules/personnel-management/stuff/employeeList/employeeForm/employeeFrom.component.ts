import { Component, Inject } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { Employee } from '../employee';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderAppointment } from '../../orderAppointmentList/orderAppointment';

@Component({
	selector: 'app-employee-form',
	templateUrl: 'employeeFrom.component.html',
	providers: [{provide: 'EmployeeDataService', useClass: DataService}, AlertService]
})
export class EmployeeFormComponent extends ReactiveFromComponent<Employee> {
	override form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		sex: new FormControl('', [Validators.required]),
		birthDate: new FormControl('', [Validators.required]),
		workPlace: new FormControl(''),
		hasVHI: new FormControl(''),
		wholeWorkLength: new FormControl<number>({disabled: true, value: 0}),
	});

	constructor(
        @Inject('EmployeeDataService') protected override dataService: DataService<Employee>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Employee();
	}

	orderAppointmentListLoaded(appointmentList: OrderAppointment[]){
		if(appointmentList.length > 0){
			this.form.controls.wholeWorkLength.setValue(appointmentList.map(x => x.workLength).reduce((a, b) => a + b));
		}
	}
}