import { Injectable, Inject } from '@angular/core';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Observable } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { DataService } from '../../services/data.service';
import { Guid } from 'guid-typescript';
import { DepartmentFilter } from '../../filters/departmentFilter';

@Injectable()
export class DepartmentSelectService implements SelectService {
	constructor(@Inject('DS_DataService') private dataService: DataService<SelectItem>){
		dataService.url = 'department';
	}

	organizationId?: Guid;
	getItemList(): Observable<SelectItem[]>{
		var filter = new DepartmentFilter();
		filter.organizationId = this.organizationId ? this.organizationId : Guid.createEmpty();
		return this.dataService.getSelectItemList(filter);
	}
}