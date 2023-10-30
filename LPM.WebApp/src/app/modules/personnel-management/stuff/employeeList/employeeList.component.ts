import { Component, Inject, ComponentRef } from '@angular/core';
import { Employee } from './employee';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { EmployeeFormComponent } from './employeeForm/employeeFrom.component';
import { EmployeeGridOptionService } from './employeeGridOption.service';
import { EmployeeGridDataService } from './employeeGridData.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: 'employeeList.component.html',
	providers: [
		{provide: 'EmployeeDataService',useClass: DataService},
		EmployeeGridDataService,
		EmployeeGridOptionService,
		ModalWindowService
	]
})
export class EmployeeListComponent extends FormWithGridComponent<Employee> {
	constructor(public override gridOptionService: EmployeeGridOptionService,
        public override gridDataService: EmployeeGridDataService,
        public override modalService: ModalWindowService,
		@Inject('EmployeeDataService')public override dataService: DataService<Employee>,
		public override alertService: AlertService
	){
		super(modalService, dataService, alertService);

		dataService.url = 'employee';
		this.gridOptionService = gridOptionService;
		this.gridDataService = gridDataService;
	}

	add(){
		this.modalService.openWithTwoButtons(
			EmployeeFormComponent,
			'Добавление сотрудника',
			'lg',
			true,
			(componentRef: ComponentRef<EmployeeFormComponent>) => {
				this.setApiUrl(componentRef);
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<EmployeeFormComponent>, popupRef) => {
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
			EmployeeFormComponent,
			'Карточка сотрудника',
			'lg',
			true,
			(componentRef: ComponentRef<EmployeeFormComponent>) => {
				componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
				this.setApiUrl(componentRef);
				componentRef.instance.ngOnInit();
			},
			(componentRef: ComponentRef<EmployeeFormComponent>, popupRef) => {
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