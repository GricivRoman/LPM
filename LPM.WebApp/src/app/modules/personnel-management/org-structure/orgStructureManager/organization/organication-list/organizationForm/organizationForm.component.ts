import { Component, Inject } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { Organization } from '../../organization';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-organization-form',
	templateUrl: 'organizationForm.component.html',
	providers: [{provide: 'DataService', useClass: DataService}, AlertService]
})
export class OrganizationFormComponent extends ReactiveFromComponent<Organization> {
	constructor(
        @Inject('DataService') protected override dataService: DataService<Organization>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Organization();
	}

	override form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		shortName: new FormControl(''),
		isMainOrganization: new FormControl(false)
	});
}