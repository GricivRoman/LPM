import { Guid } from 'guid-typescript';
import { PagedQueryFilter } from './pagedQueryFilter';

export class OrganizationFilter extends PagedQueryFilter {
	userId: Guid;
	takeOnlyMainOrganization: boolean;
}