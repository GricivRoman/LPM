import { Component, Inject } from '@angular/core';
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
export class OrganizationListComponent extends FormWithGridComponent<Organization, OrganizationFormComponent> {

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
		this.openModal(OrganizationFormComponent, 'Создать организацию', 'md', this.creationWindowInitAction);
	}

	edit(){
		this.openModal(OrganizationFormComponent, 'Редактировать организацию', 'md', this.editingWindowInitAction);
	}
}