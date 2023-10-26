import { Component, Inject } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { Employee } from '../employee';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-employee-form',
	templateUrl: 'employeeFrom.component.html',
	providers: [{provide: 'EmployeeDataService', useClass: DataService}, AlertService]
})
export class EmployeeFormComponent extends ReactiveFromComponent<Employee> {
	constructor(
        @Inject('EmployeeDataService') protected override dataService: DataService<Employee>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Employee();
	}

	override form = new FormGroup({
		name: new FormControl(''),
		sex: new FormControl(''),
		birthDate: new FormControl(''),
		workPlace: new FormControl(''),
		hasVHI: new FormControl('')
	});
}