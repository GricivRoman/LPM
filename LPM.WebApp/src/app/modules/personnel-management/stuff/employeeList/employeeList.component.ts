import { Component, Inject, ComponentRef } from '@angular/core';
import { Employee } from './employee';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { EmployeeFormComponent } from './employeeForm/employeeFrom.component';
import { EmployeeGridOptionService } from './employeeGridOption.service';
import { EmployeeGridDataService } from './employeeGridData.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { EmployeeFilterComponent } from 'src/app/modules/shared/filters/employeeFilter/employeeFilter.component';
import { AlertDialogStates } from 'src/app/modules/shared/module-frontend/forc-alert/alertDialogStates';

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
export class EmployeeListComponent extends FormWithGridComponent<Employee, EmployeeFormComponent> {
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
		this.openModal(EmployeeFormComponent, 'Добавление сотрудника', 'lg', this.creationWindowInitAction);
	}

	edit(){
		this.openModal(EmployeeFormComponent, 'Карточка сотрудника', 'lg', this.editingWindowInitAction);
	}

	openFilter(){
		this.modalService.openWithTwoButtons(
			EmployeeFilterComponent,
			'Фильр сотрудников',
			'sm',
			false,
			() => {},
			(ref: ComponentRef<EmployeeFilterComponent>, popupRef) => {
				console.log(ref.instance.form.value);
				this.gridDataService.filter.PatchValue(ref.instance.form.value);
				this.grid.refresh().then(() => {
					popupRef.close();
				}).catch(() => {
					this.alertService.showMessage('Something went wrong', AlertDialogStates.error);
				});
			},
			(ref, popupRef) => {
				popupRef.close();
			}
		);
	}
}