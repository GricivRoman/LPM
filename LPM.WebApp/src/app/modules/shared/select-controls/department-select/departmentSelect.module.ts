import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { DepartmentSelectService } from './departmentSelect.service';
import { DepartmentSelectComponent } from './departmentSelectComponent';
import { DataService } from '../../services/data.service';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		DepartmentSelectComponent
	],
	exports: [
		DepartmentSelectComponent
	],
	providers: [
		DataService,
		{ provide: 'DS_DataService', useClass: DataService },
		DepartmentSelectService
	]
})
export class DepartmentSelectModule {

}