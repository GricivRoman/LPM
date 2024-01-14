import { Component, Inject, OnInit } from '@angular/core';
import { Relative } from '../relative';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-relative-form',
	templateUrl: 'relativeForm.component.html',
	providers: [
		{provide: 'RelativeDataService',useClass: DataService}
	]
})

export class RelativeFormComponent extends ReactiveFromComponent<Relative> implements OnInit {

	public employeeId: Guid;

	override form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		sex: new FormControl('', [Validators.required]),
		birthDate: new FormControl('', [Validators.required]),
		employeeId: new FormControl<Guid>(Guid.createEmpty()),
	});

	constructor(
        @Inject('RelativeDataService') protected override dataService: DataService<Relative>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Relative();
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.form.statusChanges.subscribe(() => this.form.controls.employeeId.setValue(this.employeeId, { emitEvent: false }));
	}
}