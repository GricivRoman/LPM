import { Injectable, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Organization } from '../organization';
import { DataService } from 'src/app/modules/shared/services/data.service';

@Injectable()
export class OrganizationListDataService implements GridDataService<Organization> {
	
	constructor(@Inject('OrganizationDataService')private dataService: DataService<Organization>){
		this.dataService.url = 'organization';
	}

	getGridData(): Observable<Organization[]>{
		return this.dataService.getList();
	}
}