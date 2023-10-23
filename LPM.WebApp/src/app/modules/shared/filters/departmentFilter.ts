import { PagedQueryFilter } from "./pagedQueryFilter";
import { Guid } from 'guid-typescript';

export class DepartmentFilter extends PagedQueryFilter {
    organizationId: Guid;
}