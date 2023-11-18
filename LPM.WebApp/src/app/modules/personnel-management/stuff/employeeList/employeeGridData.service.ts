import { Injectable, Inject } from '@angular/core';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { EmployeeFilter } from 'src/app/modules/shared/filters/employeeFilter/employeeFilter';

@Injectable()
export class EmployeeGridDataService implements GridDataService<Employee> {

	public filter: EmployeeFilter = new EmployeeFilter();

	constructor(@Inject('EmployeeDataService')private dataService: DataService<Employee>){
		this.dataService.url = 'employee';
	}

	getGridData(): Observable<Employee[]>{
		return this.dataService.getList(this.filter);
	}
}