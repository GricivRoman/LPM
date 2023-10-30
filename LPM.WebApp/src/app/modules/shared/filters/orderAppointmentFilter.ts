import { PagedQueryFilter } from './pagedQueryFilter';
import { Guid } from 'guid-typescript';

export class OrderAppointmentFilter extends PagedQueryFilter {
	employeeId: Guid;
}