import { NgModule } from '@angular/core';
import { StuffRoutingModule } from './stuff-routing.module';
import { GridModule } from '../../shared/module-frontend/forc-grid/grid.module';
import { StuffComponent } from './stuff.component';
import { EmployeeListComponent } from './employeeList/employeeList.component';
import { ForcButtonsModule } from '../../shared/module-frontend/forc-buttons/forc-buttons.module';
import { EmployeeFormComponent } from './employeeList/employeeForm/employeeFrom.component';
import { DataService } from '../../shared/services/data.service';
import { ModalWindowService } from '../../shared/module-frontend/forc-popup/modalWindow.service';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { OrderAppointmentListComponent } from './orderAppointmentList/orderAppointmentList.component';
import { ForcControlsModule } from '../../shared/module-frontend/controls/forc-controls.module';
import { SexSelectModule } from '../../shared/select-controls/sex-select/sexSelect.module';
import { OrderAppointmentFormComponent } from './orderAppointmentList/orderAppointmentForm/orderAppointmentForm.component';
import { DepartmentSelectModule } from '../../shared/select-controls/department-select/departmentSelect.module';
import { EmployeeTypeSelectModule } from '../../shared/select-controls/employeeType-select/employeeTypeSelect.module';
import { OrganizationSelectModule } from '../../shared/select-controls/organization-select/organizationSelect.module';

@NgModule({
	imports: [
		StuffRoutingModule,
		GridModule,
		ForcButtonsModule,
		ForcControlsModule,
		SexSelectModule,
		DepartmentSelectModule,
		EmployeeTypeSelectModule,
		OrganizationSelectModule
	],
	declarations: [
		StuffComponent,
		EmployeeListComponent,
		EmployeeFormComponent,
		OrderAppointmentListComponent,
		OrderAppointmentFormComponent
	],
	providers: [
		ModalWindowService,
		AlertService,
		{provide: 'EmployeeDataService', useClass: DataService},
		{provide: 'OrderAppointmentDataService', useClass: DataService},
	]
})
export class StuffModule {

}