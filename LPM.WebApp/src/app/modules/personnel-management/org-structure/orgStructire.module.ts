import { NgModule } from '@angular/core';
import { OrgStructureManagerComponent } from './orgStructureManager/orgStructureManager.component';
import { OrgStructureRoutingModule } from './org.structure-routing-module';
import { OrganizationComponent } from './orgStructureManager/organization/organization.cimponent';
import { GridModule } from '../../shared/module-frontend/forc-grid/grid.module';
import { ForcButtonsModule } from '../../shared/module-frontend/forc-buttons/forc-buttons.module';
import { OrganizationListComponent } from './orgStructureManager/organization/organication-list/organizationList.component';
import { OrganizationLIstOptionsService } from './orgStructureManager/organization/organication-list/organizationListOptions.service';
import { OrganizationListDataService } from './orgStructureManager/organization/organication-list/organizationListData.service';
import { ModalWindowService } from '../../shared/module-frontend/forc-popup/modalWindow.service';
import { ApiValidationErrorsResolvingService } from '../../shared/services/apiValidationErrorsResolving.service';
import { OrganizationFormComponent } from './orgStructureManager/organization/organication-list/organizationForm/organizationForm.component';
import { ForcControlsModule } from '../../shared/module-frontend/controls/forc-controls.module';

@NgModule({
	imports: [
		OrgStructureRoutingModule,
		GridModule,
		ForcButtonsModule,
		ForcControlsModule
	],
	declarations: [
		OrgStructureManagerComponent,
		OrganizationComponent,
		OrganizationListComponent,
		OrganizationFormComponent
	],
	providers: [
		OrganizationLIstOptionsService,
		OrganizationListDataService,
		ModalWindowService,
		ApiValidationErrorsResolvingService
	]
})
export class OrgStructureModule {

}