import { NgModule } from '@angular/core';
import { GlobalOrganizationComponent } from './globalOrganization.component';
import { OrganizationLocalStorageService } from '../../shared/local-storage/organization-localStorage/organizationLocalStorage.service';
import { SelectModule } from '../../shared/module-frontend/forc-select/select.module';
import { CommonModule } from '@angular/common';

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
		OrganizationLocalStorageService
	]
})
export class GlobalOrganizationModule {

}