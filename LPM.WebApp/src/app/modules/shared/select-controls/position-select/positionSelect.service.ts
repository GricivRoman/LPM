import { Injectable, Inject } from '@angular/core';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SelectItem } from '../../models/selectItem';

@Injectable()
export class PositionSelectService implements SelectService {
	constructor(@Inject('PS_DataService') private dataService: DataService<SelectItem>){
		dataService.url = 'position';
	}

	getItemList(): Observable<SelectItem[]>{
		return this.dataService.getSelectItemList();
	}
}