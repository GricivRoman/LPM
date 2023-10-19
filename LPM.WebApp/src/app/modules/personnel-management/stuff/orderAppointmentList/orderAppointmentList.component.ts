import { Component, Inject, ComponentRef } from '@angular/core';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { OrderAppointment } from './orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { OrderAppointmentFormComponent } from './orderAppointmentForm/orderAppointmentForm.component';
import { OrderAppointmentGridDataService } from './orderAppointmentGridData.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { OrderAppointmentGridOptionsService } from './orderAppointmentGridOptions.service';

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
export class OrderAppointmentListComponent extends FormWithGridComponent<OrderAppointment> {
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

	add(){
		this.modalService.openWithTwoButtons(
			OrderAppointmentFormComponent,
			'Создать договор',
			'md',
			true,
			(componentRef: ComponentRef<OrderAppointmentFormComponent>) => {
				this.setApiUrl(componentRef);
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef) => {
				componentRef.instance.save(() => {
					this.grid.refresh();
					popupRef.close();
				});
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}

	edit(){
		this.modalService.openWithTwoButtons(
			OrderAppointmentFormComponent,
			'Карточка договора',
			'md',
			true,
			(componentRef: ComponentRef<OrderAppointmentFormComponent>) => {
				componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
				this.setApiUrl(componentRef);
				componentRef.instance.ngOnInit();
			},
			(componentRef: ComponentRef<OrderAppointmentFormComponent>, popupRef) => {
				componentRef.instance.save(() => {
					this.grid.refresh();
					popupRef.close();
				});
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}
}