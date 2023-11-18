import { Component, Inject, ComponentRef, ViewChild } from '@angular/core';
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
import { FilterButtonComponent } from 'src/app/modules/shared/module-frontend/forc-buttons/buttons/filter-button.component';
import { EmployeeFilter } from 'src/app/modules/shared/filters/employeeFilter/employeeFilter';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
	@ViewChild(FilterButtonComponent, {static: false}) filterBtn: FilterButtonComponent;

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
		this.modalService.openWithResetSaveCloseButtons(
			EmployeeFilterComponent,
			'Фильр сотрудников',
			'md',
			false,
			(ref: ComponentRef<EmployeeFilterComponent>) => {
				ref.instance.form.patchValue(this.gridDataService.filter);
			},
			(ref: ComponentRef<EmployeeFilterComponent>, popupRef) => {
				this.applyFilter(ref, popupRef);
			},
			'Применить',
			(ref, popupRef) => {
				popupRef.close();
			},
			(ref: ComponentRef<EmployeeFilterComponent>, popupRef) => {
				ref.instance.form.reset();
				this.applyFilter(ref, popupRef);
			}
		);
	}

	checkFilterEmpty(filter: EmployeeFilter){
		this.filterBtn.filterIsActive = !!(filter.department || filter.organization);
	}

	private applyFilter(ref: ComponentRef<EmployeeFilterComponent>, popupRef: NgbModalRef){
		this.gridDataService.filter.PatchValue(ref.instance.form.value as EmployeeFilter);
		this.grid.refresh().then(() => {
			this.checkFilterEmpty(this.gridDataService.filter);
			popupRef.close();
		}).catch(() => {
			this.alertService.showMessage('Something went wrong', AlertDialogStates.error);
		});
	}
}