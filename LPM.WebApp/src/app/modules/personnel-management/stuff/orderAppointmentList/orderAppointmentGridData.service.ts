import { Injectable, Inject } from '@angular/core';
import { GridDataService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-data.service';
import { OrderAppointment } from './orderAppointment';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrderAppointmentGridDataService implements GridDataService<OrderAppointment> {
	constructor(@Inject('OrderAppointmentDataService')private dataService: DataService<OrderAppointment>){
		this.dataService.url = 'employee';
	}

	getGridData(): Observable<OrderAppointment[]>{
		return of();
	}
}