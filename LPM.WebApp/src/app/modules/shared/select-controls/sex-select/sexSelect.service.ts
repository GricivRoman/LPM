import { Observable, of } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { SexEnum, SexEnumDictionary } from '../../enums/sexEnum';
import { Injectable } from '@angular/core';

@Injectable()
export class SexSelectService implements SelectService {
	items: SelectItem[] = [
		{
			id: SexEnum.male,
			value: SexEnumDictionary.list.get(SexEnum.male) as string
		},
		{
			id: SexEnum.female,
			value: SexEnumDictionary.list.get(SexEnum.female) as string
		}
	];

	public getItemList(): Observable<SelectItem[]> {
		return of(this.items);
	}
}