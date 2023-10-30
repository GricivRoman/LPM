import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { EmployeeTypeSelectComponent } from './employeeTypeSelect.component';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		EmployeeTypeSelectComponent
	],
	exports: [
		EmployeeTypeSelectComponent
	]
})
export class EmployeeTypeSelectModule {

}