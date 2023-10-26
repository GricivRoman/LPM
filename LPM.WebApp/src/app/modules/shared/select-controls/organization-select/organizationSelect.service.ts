import { Injectable, Inject } from '@angular/core';
import { SelectService } from '../../module-frontend/forc-select/select.service';
import { Observable, of } from 'rxjs';
import { SelectItem } from '../../models/selectItem';
import { DataService } from '../../services/data.service';
import { OrganizationFilter } from '../../filters/organizationFilter';
import { Guid } from 'guid-typescript';
import { AuthLocalStorageService } from '../../local-storage/auth-localStorage/authLocalStorage.service';

@Injectable()
export class OrganizationSelectService implements SelectService {
	private userId?: Guid;

	constructor(@Inject('OS_DataService') private dataService: DataService<SelectItem>,
	private authLocalStorageService: AuthLocalStorageService)
	{
		dataService.url = 'organization';
	}

	getItemList(): Observable<SelectItem[]>{
		this.userId = this.authLocalStorageService.authInfo?.userId;
		if(!this.userId){
			return of([]);
		}
		const filter = new OrganizationFilter();
		filter.userId = this.userId;
		return this.dataService.getSelectItemList(filter);
	}

	getMainOrganization(filter: OrganizationFilter): Observable<SelectItem[]>{
		this.userId = this.authLocalStorageService.authInfo?.userId;
		if(!this.userId){
			return of([]);
		}

		filter.userId = this.userId;
		return this.dataService.getSelectItemList(filter);
	}
}