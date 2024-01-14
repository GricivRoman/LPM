import { Component, ComponentRef, Inject } from '@angular/core';
import { ReactiveFromComponent } from 'src/app/modules/shared/base-components/reactiveForm.component';
import { Employee } from '../employee';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderAppointment } from '../../orderAppointment/orderAppointment';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { RelativeListComponent } from '../../relative/relativeListComponent';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Relative } from '../../relative/relative';

@Component({
	selector: 'app-employee-form',
	templateUrl: 'employeeFrom.component.html',
	providers: [{provide: 'EmployeeDataService', useClass: DataService}, AlertService, ModalWindowService]
})
export class EmployeeFormComponent extends ReactiveFromComponent<Employee> {
	public numberOfRelatives: number = 0;
	public relatives: Relative[];

	override form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		sex: new FormControl('', [Validators.required]),
		birthDate: new FormControl('', [Validators.required]),
		workPlace: new FormControl(''),
		hasVHI: new FormControl(''),
		wholeWorkLength: new FormControl<number>({disabled: true, value: 0}),
		relatives: new FormControl<Relative[]>([])
	});

	constructor(
        @Inject('EmployeeDataService') protected override dataService: DataService<Employee>,
        protected override alertService: AlertService,
        protected override errorResolvingService: ApiValidationErrorsResolvingService,
		protected modalService: ModalWindowService
	){
		super(dataService, alertService, errorResolvingService);
		this.createEmptyModel = () => new Employee();
	}

	orderAppointmentListLoaded(appointmentList: OrderAppointment[]){
		if(appointmentList.length > 0){
			this.form.controls.wholeWorkLength.setValue(appointmentList.map(x => x.workLength).reduce((a, b) => a + b));
		}
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.form.controls.relatives.valueChanges.subscribe((relatives : Relative[] | null) => {
			if(relatives){
				this.numberOfRelatives = relatives.length;
				this.relatives = relatives;
			}
		});
	}

	showChildren(){
		this.modalService.openWithCloseButton(
			RelativeListComponent,
			'Родственники сотрудника',
			'md',
			true,
			(componentRef: ComponentRef<RelativeListComponent>) => {
				if(this.model.id){
					componentRef.instance.employeeId = this.model.id;
					componentRef.instance.gridDataService.employeeId = this.model.id;
					componentRef.instance.grid.refresh().subscribe();
				}
			},
			(componentRef: ComponentRef<RelativeListComponent>, popupRef: NgbModalRef) => {
				popupRef.close();
			}
		);
	}
}