import { NgModule } from '@angular/core';
import { OrgStructureManagerComponent } from './orgStructureManager/orgStructureManager.component';
import { OrgStructureRoutingModule } from './org.structure-routing-module';
import { OrganizationComponent } from './orgStructureManager/organization/organization.component';
import { GridModule } from '../../shared/module-frontend/forc-grid/grid.module';
import { ForcButtonsModule } from '../../shared/module-frontend/forc-buttons/forc-buttons.module';
import { OrganizationListComponent } from './orgStructureManager/organization/organication-list/organizationList.component';
import { OrganizationLIstOptionsService } from './orgStructureManager/organization/organication-list/organizationListOptions.service';
import { OrganizationListDataService } from './orgStructureManager/organization/organication-list/organizationListData.service';
import { ModalWindowService } from '../../shared/module-frontend/forc-popup/modalWindow.service';
import { ApiValidationErrorsResolvingService } from '../../shared/services/apiValidationErrorsResolving.service';
import { OrganizationFormComponent } from './orgStructureManager/organization/organication-list/organizationForm/organizationForm.component';
import { ForcControlsModule } from '../../shared/module-frontend/controls/forc-controls.module';
import { DataService } from '../../shared/services/data.service';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { DepartmentComponent } from './orgStructureManager/department/department.component';
import { DepartmentListComponent } from './orgStructureManager/department/department-list/departmentList.component';
import { DepartmentFormComponent } from './orgStructureManager/department/department-list/departmentForm/departmentForm.component';
import { DepartmentGridDataService } from './orgStructureManager/department/department-list/departmentGridData.service';
import { DepartmentGridOptionService } from './orgStructureManager/department/department-list/departmentGridOptions.service';
import { OrganizationSelectModule } from '../../shared/select-controls/organization-select/organizationSelect.module';

@NgModule({
	imports: [
		OrgStructureRoutingModule,
		GridModule,
		ForcButtonsModule,
		ForcControlsModule,
		OrganizationSelectModule
	],
	declarations: [
		OrgStructureManagerComponent,
		OrganizationComponent,
		OrganizationListComponent,
		OrganizationFormComponent,
		DepartmentComponent,
		DepartmentListComponent,
		DepartmentFormComponent
	],
	providers: [
		OrganizationLIstOptionsService,
		OrganizationListDataService,
		ModalWindowService,
		ApiValidationErrorsResolvingService,
		AlertService,
		DepartmentGridDataService,
		DepartmentGridOptionService,
		{provide: 'OrganizationDataService', useClass: DataService},
		{provide: 'DepartmentDataService', useClass: DataService}
	]
})
export class OrgStructureModule {

}