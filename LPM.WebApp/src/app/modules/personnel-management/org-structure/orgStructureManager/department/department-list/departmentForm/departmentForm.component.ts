import { Component, Inject } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { Department } from '../department';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForcValidators } from 'src/app/modules/shared/validation/forcValidators';

@Component({
	selector: 'app-department-form',
	templateUrl: 'departmentForm.component.html',
	providers: [{provide: 'DataService', useClass: DataService}, AlertService]
})
export class DepartmentFormComponent extends ReactiveFromComponent<Department> {
	constructor(
        @Inject('DataService') protected override dataService: DataService<Department>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Department();
	}

	override form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		shortName: new FormControl(''),
		description: new FormControl(''),
		organization: new FormControl('', [ForcValidators.selectItemRequired()])
	});
}