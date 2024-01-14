import { Guid } from 'guid-typescript';
import { PagedQueryFilter } from './pagedQueryFilter';

export class RelativeFilter extends PagedQueryFilter {
	employeeId: Guid;
}