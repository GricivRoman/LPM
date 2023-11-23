import { Observable, of } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Injectable } from '@angular/core';

@Injectable()
export class YesNoSelectService implements SelectService {
	items: SelectItem[] = [
		{
			id: true,
			value: "Да"
		},
		{
			id: false,
			value: "Нет"
		}
	];

	public getItemList(): Observable<SelectItem[]> {
		return of(this.items);
	}
}