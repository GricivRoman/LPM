import { NgModule } from '@angular/core';
import { GlobalOrganizationComponent } from './globalOrganization.component';
import { OrganizationLocalStorageService } from '../../shared/local-storage/organization-localStorage/organizationLocalStorage.service';
import { SelectModule } from '../../shared/module-frontend/forc-select/select.module';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';

@NgModule({
	imports: [
		SelectModule,
		CommonModule
	],
	declarations: [
		GlobalOrganizationComponent
	],
	exports: [
		GlobalOrganizationComponent
	],
	providers: [
		OrganizationLocalStorageService,
		AlertService
	]
})
export class GlobalOrganizationModule {

}