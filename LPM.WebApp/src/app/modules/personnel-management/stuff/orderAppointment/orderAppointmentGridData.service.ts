import { Injectable, Inject } from '@angular/core';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { OrderAppointment } from './orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { Observable, of } from 'rxjs';
import { Guid } from 'guid-typescript';
import { OrderAppointmentFilter } from 'src/app/modules/shared/filters/orderAppointmentFilter';

@Injectable()
export class OrderAppointmentGridDataService implements GridDataService<OrderAppointment> {
	public employeeId: Guid;

	constructor(@Inject('OrderAppointmentDataService')private dataService: DataService<OrderAppointment>){
		this.dataService.url = 'order-appointment';
	}

	getGridData(): Observable<OrderAppointment[]>{
		if(!this.employeeId){
			return of([]);
		}

		const filter = new OrderAppointmentFilter();
		filter.employeeId = this.employeeId;
		return this.dataService.getList(filter);
	}
}