import { Component, Inject, ComponentRef, Input, OnChanges } from '@angular/core';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { OrderAppointment } from './orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { OrderAppointmentFormComponent } from './orderAppointmentForm/orderAppointmentForm.component';
import { OrderAppointmentGridDataService } from './orderAppointmentGridData.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { OrderAppointmentGridOptionsService } from './orderAppointmentGridOptions.service';
import { Guid } from 'guid-typescript';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs';

@Component({
	selector: 'app-order-appointment',
	templateUrl: 'orderAppointmentList.component.html',
	providers: [
		{provide: 'OrderAppointmentDataService', useClass: DataService},
		OrderAppointmentGridOptionsService,
		OrderAppointmentGridDataService,
		ModalWindowService
	]
})
export class OrderAppointmentListComponent extends FormWithGridComponent<OrderAppointment> implements OnChanges {
	@Input()
		employeeId?: Guid;

	constructor(public override gridOptionService: OrderAppointmentGridOptionsService,
        public override gridDataService: OrderAppointmentGridDataService,
        public override modalService: ModalWindowService,
		@Inject('OrderAppointmentDataService')public override dataService: DataService<OrderAppointment>,
		public override alertService: AlertService
	){
		super(modalService, dataService, alertService);

		dataService.url = 'order-appointment';
		this.gridOptionService = gridOptionService;
		this.gridDataService = gridDataService;
	}

	ngOnChanges(){
		if(this.employeeId){
			this.gridDataService.employeeId = this.employeeId;
			this.grid.refresh();
		}
	}

	add(){
		this.openModal('Создать договор', 'md', this.creationWindowInitAction);
	}

	edit(){
		this.openModal('Карточка договора', 'md', this.editingWindowInitAction);
	}

	private addValidationChangesListener(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef){
		popupRef.componentInstance.saveButtonDisabled = true;
		const instance = componentRef.instance;
		instance.form.valueChanges.pipe(takeUntil(instance.destroy$)).subscribe(() => {
			popupRef.componentInstance.saveButtonDisabled = !instance.form.valid;
		})
	}

	private defaultInitAction(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef){
		this.addValidationChangesListener(componentRef, popupRef);
		this.setApiUrl(componentRef);
		if(this.employeeId){
			componentRef.instance.model.employeeId = this.employeeId;
		}
	}

	private defaultSaveAction(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef){
		componentRef.instance.save(() => {
			this.grid.refresh();
			popupRef.close();
		});
	}

	private creationWindowInitAction = (componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef) => {
		this.defaultInitAction(componentRef, popupRef);
		componentRef.instance.modelId = this.userId;
	}

	private editingWindowInitAction = (componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef) => {
		this.defaultInitAction(componentRef, popupRef);
		componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
		componentRef.instance.ngOnInit();
	}

	private openModal(title: string, size: string,
		initAction: (componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef) => void,
		closeAction: (componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef) => void = this.defaultSaveAction
	){
		this.modalService.openWithTwoButtons(
			OrderAppointmentFormComponent,
			title,
			size,
			true,
			(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef) => {
				initAction(componentRef, popupRef);
			},
			(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef) => {
				closeAction(componentRef, popupRef);
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}
}