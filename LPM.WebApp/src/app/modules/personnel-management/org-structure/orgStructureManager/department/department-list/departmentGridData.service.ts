import { Injectable, Inject } from '@angular/core';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Department } from './department';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AuthLocalStorageService } from 'src/app/modules/shared/local-storage/auth-localStorage/authLocalStorage.service';
import { DepartmentFilter } from 'src/app/modules/shared/filters/departmentFilter';

@Injectable()
export class DepartmentGridDataService implements GridDataService<Department> {
	constructor(@Inject('DepartmentDataService')private dataService: DataService<Department>,
	private authLocalStorageService: AuthLocalStorageService){
		this.dataService.url = 'department';
	}

	getGridData(): Observable<Department[]>{
		const filter = new DepartmentFilter();
		filter.userId = this.authLocalStorageService.authInfo?.userId;

		return this.dataService.getList(filter);
	}
}