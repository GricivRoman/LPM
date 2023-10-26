import { Injectable, Inject } from '@angular/core';
import { Observable, of} from 'rxjs';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Organization } from '../organization';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { AuthLocalStorageService } from 'src/app/modules/shared/local-storage/auth-localStorage/authLocalStorage.service';
import { OrganizationFilter } from 'src/app/modules/shared/filters/organizationFilter';
import { Guid } from 'guid-typescript';

@Injectable()
export class OrganizationListDataService implements GridDataService<Organization> {
	userId?: Guid;

	constructor(@Inject('OrganizationDataService')private dataService: DataService<Organization>,
	private authLocalStorageService: AuthLocalStorageService
	){
		this.dataService.url = 'organization';
	}

	getGridData(): Observable<Organization[]>{
		this.userId = this.authLocalStorageService.authInfo?.userId;
		if(!this.userId){
			return of();
		}
		const filter = new OrganizationFilter();
		filter.userId = this.userId;
		return this.dataService.getList(filter);
	}
}