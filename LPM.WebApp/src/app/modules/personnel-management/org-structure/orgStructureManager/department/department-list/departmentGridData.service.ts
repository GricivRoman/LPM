import { Injectable, Inject } from '@angular/core'
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Department } from './department';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/modules/shared/services/data.service';

@Injectable()
export class DepartmentGridDataService implements GridDataService<Department> {
    constructor(@Inject('DepartmentDataService')private dataService: DataService<Department>){
		this.dataService.url = 'department';
	}
    
    getGridData(): Observable<Department[]>{
        return this.dataService.getList();
    }
}