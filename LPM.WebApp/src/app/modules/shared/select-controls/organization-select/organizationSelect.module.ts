import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { OrganizationSelectService } from './organizationSelect.service';
import { OrganizationSelectComponent } from './organizationSelectComponent';
import { DataService } from '../../services/data.service';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		OrganizationSelectComponent
	],
	exports: [
		OrganizationSelectComponent
	],
	providers: [
		DataService,
		{ provide: 'OS_DataService', useClass: DataService },
		OrganizationSelectService
	]
})
export class OrganizationSelectModule {

}