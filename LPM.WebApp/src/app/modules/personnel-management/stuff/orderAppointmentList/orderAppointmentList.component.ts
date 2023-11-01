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
export class OrderAppointmentListComponent extends FormWithGridComponent<OrderAppointment, OrderAppointmentFormComponent> implements OnChanges {
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
		this.openModal(OrderAppointmentFormComponent, 'Создать договор', 'md', this.creationWindowInitAction);
	}

	edit(){
		this.openModal(OrderAppointmentFormComponent, 'Карточка договора', 'md', this.editingWindowInitAction);
	}

	protected override defaultInitAction(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef: NgbModalRef){
		super.defaultInitAction(componentRef, popupRef);
		if(this.employeeId){
			componentRef.instance.model.employeeId = this.employeeId;
		}
	}
}