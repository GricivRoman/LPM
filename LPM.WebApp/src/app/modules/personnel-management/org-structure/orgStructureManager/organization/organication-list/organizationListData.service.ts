import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Organization } from './organization';
import { Guid } from 'guid-typescript';

@Injectable()
export class OrganizationListDataService implements GridDataService<Organization> {
	getGridData(): Observable<Organization[]>{
		const orgs: Organization[] = [];
		orgs.push({
			id: Guid.create(),
			name: 'ООО "Пупсики"',
			shortName: 'Пупсики',
			mainOrganization: true,
			employeesCount: 15
		},
		{
			id: Guid.create(),
			name: 'ООО "Китайская народная республика"',
			shortName: 'Китайцы',
			mainOrganization: false,
			employeesCount: 1200000000
		});

		return of(orgs);
	}
}