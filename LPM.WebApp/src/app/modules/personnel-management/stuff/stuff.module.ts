import { NgModule } from '@angular/core';
import { StuffRoutingModule } from './stuff-routing.module';
import { GridModule } from '../../shared/module-frontend/forc-grid/grid.module';
import { StuffComponent } from './stuff.component';
import { EmployeeListComponent } from './employee/employeeList.component';
import { ForcButtonsModule } from '../../shared/module-frontend/forc-buttons/forc-buttons.module';
import { EmployeeFormComponent } from './employee/employeeForm/employeeFrom.component';
import { DataService } from '../../shared/services/data.service';
import { ModalWindowService } from '../../shared/module-frontend/forc-popup/modalWindow.service';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { OrderAppointmentListComponent } from './orderAppointment/orderAppointmentList.component';
import { ForcControlsModule } from '../../shared/module-frontend/controls/forc-controls.module';
import { SexSelectModule } from '../../shared/select-controls/sex-select/sexSelect.module';
import { OrderAppointmentFormComponent } from './orderAppointment/orderAppointmentForm/orderAppointmentForm.component';
import { DepartmentSelectModule } from '../../shared/select-controls/department-select/departmentSelect.module';
import { EmployeeTypeSelectModule } from '../../shared/select-controls/employeeType-select/employeeTypeSelect.module';
import { OrganizationSelectModule } from '../../shared/select-controls/organization-select/organizationSelect.module';
import { EmployeeFilterComponent } from '../../shared/filters/employeeFilter/employeeFilter.component';
import { RelativeListComponent } from './relative/relativeListComponent';
import { RelativeFormComponent } from './relative/relativeForm/relativeFormComponent';

@NgModule({
	imports: [
		StuffRoutingModule,
		GridModule,
		ForcButtonsModule,
		ForcControlsModule,
		SexSelectModule,
		DepartmentSelectModule,
		EmployeeTypeSelectModule,
		OrganizationSelectModule,
		EmployeeFilterComponent
	],
	declarations: [
		StuffComponent,
		EmployeeListComponent,
		EmployeeFormComponent,
		OrderAppointmentListComponent,
		OrderAppointmentFormComponent,
		RelativeListComponent,
		RelativeFormComponent
	],
	providers: [
		ModalWindowService,
		AlertService,
		{provide: 'EmployeeDataService', useClass: DataService},
		{provide: 'OrderAppointmentDataService', useClass: DataService},
		{provide: 'RelativeDataService', useClass: DataService},
	]
})
export class StuffModule {

}