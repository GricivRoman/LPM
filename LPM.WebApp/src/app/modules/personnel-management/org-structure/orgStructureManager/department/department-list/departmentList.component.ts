import { Component, Inject, ComponentRef } from '@angular/core'
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { Department } from './department';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { DepartmentFormComponent } from './departmentForm/departmentForm.component';
import { DepartmentGridOptionService } from './departmentGridOptions.service';
import { DepartmentGridDataService } from './departmentGridData.service';

@Component({
    selector: 'app-department-list',
    templateUrl: 'departmentList.component.html',
    providers: [{provide: 'DepartmentDataService', useClass: DataService}]
})
export class DepartmentListComponent extends FormWithGridComponent<Department> {
    
    constructor(public override gridOptionService: DepartmentGridOptionService,
        public override gridDataService: DepartmentGridDataService,
        public override modalService: ModalWindowService,
		@Inject('DepartmentDataService')public override dataService: DataService<Department>,
		public override alertService: AlertService
	){
		super(modalService, dataService, alertService);
		dataService.url = 'department';
        
        this.gridOptionService = gridOptionService;
        this.gridDataService = gridDataService;
	}

    add(){
		this.modalService.openWithTwoButtons(
			DepartmentFormComponent,
			'Создать отдел',
			'md',
			true,
			(componentRef: ComponentRef<DepartmentFormComponent>) => {
				this.setApiUrl(componentRef);
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<DepartmentFormComponent>, popupRef) => {
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
			DepartmentFormComponent,
			'Редактировать отдел',
			'md',
			true,
			(componentRef: ComponentRef<DepartmentFormComponent>) => {
				componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
				this.setApiUrl(componentRef);
				componentRef.instance.ngOnInit();
			},
			(componentRef: ComponentRef<DepartmentFormComponent>, popupRef) => {
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