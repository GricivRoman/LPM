import { Injectable, Inject } from '@angular/core';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Observable } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { DataService } from '../../services/data.service';
import { Guid } from 'guid-typescript';

@Injectable()
export class DepartmentSelectService implements SelectService {
	constructor(@Inject('DS_DataService') private dataService: DataService<SelectItem>){
		dataService.url = 'department';
	}

	// TODO сделать через query, там реализовать пагинацию + передачу объекта для фильтрации
	organizationId?: Guid;
	getItemList(): Observable<SelectItem[]>{
		return this.organizationId ? this.dataService.getSelectItemList(this.organizationId) : this.dataService.getSelectItemList(Guid.createEmpty());
	}
}