import { Inject, Injectable } from '@angular/core';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { Relative } from './relative';
import { Observable, of } from 'rxjs';
import { RelativeFilter } from 'src/app/modules/shared/filters/relativeFilter';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { Guid } from 'guid-typescript';

@Injectable()
export class RelativeGridDataService implements GridDataService<Relative> {
	public employeeId: Guid;
	public filter: RelativeFilter = new RelativeFilter();

	constructor(@Inject('RelativeDataService')private dataService: DataService<Relative>){
		this.dataService.url = 'relative';
	}

	getGridData(): Observable<Relative[]>{
		if(!this.employeeId){
			return of();
		}

		this.filter.employeeId = this.employeeId;
		return this.dataService.getList(this.filter);
	}
}