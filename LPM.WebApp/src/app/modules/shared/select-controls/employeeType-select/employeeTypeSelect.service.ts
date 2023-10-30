import { Observable, of } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Injectable } from '@angular/core';
import { EmployeeTypeEnum, EmployeeTypeEnumDictionary } from '../../enums/employeeTypeEnum';

@Injectable()
export class EmployeeTypeSelectService implements SelectService {
	items: SelectItem[] = [
		{
			id: EmployeeTypeEnum.manager,
			value: EmployeeTypeEnumDictionary.list.get(EmployeeTypeEnum.manager) as string
		},
		{
			id: EmployeeTypeEnum.officeWorker,
			value: EmployeeTypeEnumDictionary.list.get(EmployeeTypeEnum.officeWorker) as string
		},
		{
			id: EmployeeTypeEnum.factoryWorker,
			value: EmployeeTypeEnumDictionary.list.get(EmployeeTypeEnum.factoryWorker) as string
		}
	];

	public getItemList(): Observable<SelectItem[]> {
		return of(this.items);
	}
}