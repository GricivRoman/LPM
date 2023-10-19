import { Component, ComponentRef, Inject } from '@angular/core';
import { OrganizationLIstOptionsService } from './organizationListOptions.service';
import { OrganizationListDataService } from './organizationListData.service';
import { Organization } from '../organization';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { OrganizationFormComponent } from './organizationForm/organizationForm.component';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';

@Component({
	selector: 'app-organization-list',
	templateUrl: 'organizationList.component.html',
	providers: [{provide: 'OrganizationDataService', useClass: DataService}]
})
export class OrganizationListComponent extends FormWithGridComponent<Organization> {

	constructor(public override gridOptionService: OrganizationLIstOptionsService,
        public override gridDataService: OrganizationListDataService,
        public override modalService: ModalWindowService,
		@Inject('OrganizationDataService')public override dataService: DataService<Organization>,
		public override alertService: AlertService
	){
		super(modalService, dataService, alertService);

		dataService.url = 'organization';
		this.gridOptionService = gridOptionService;
		this.gridDataService = gridDataService;
	}

	add(){
		this.modalService.openWithTwoButtons(
			OrganizationFormComponent,
			'Создать организацию',
			'md',
			true,
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				this.setApiUrl(componentRef);
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<OrganizationFormComponent>, popupRef) => {
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
			OrganizationFormComponent,
			'Редактировать организацию',
			'md',
			true,
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
				this.setApiUrl(componentRef);
				componentRef.instance.ngOnInit();
			},
			(componentRef: ComponentRef<OrganizationFormComponent>, popupRef) => {
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