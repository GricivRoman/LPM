import { SelectItem } from '../../models/selectItem';
import { PagedQueryFilter } from '../pagedQueryFilter';

export class EmployeeFilter extends PagedQueryFilter {
	organization?: SelectItem | null;
	department?: SelectItem | null;

	public PatchValue(model : {organization?: SelectItem | null, department?: SelectItem | null}){
		this.organization = model.organization;
		this.department = model.department;
	}
}