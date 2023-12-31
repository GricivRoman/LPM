import { SelectItem } from '../../models/selectItem';
import { PagedQueryFilter } from '../pagedQueryFilter';

export class EmployeeFilter extends PagedQueryFilter {
	organization?: SelectItem;
	departmentList?: SelectItem[];
	ageDiapazoneStart?: number;
	ageDiapazoneEnd?: number;
	sex?: SelectItem;
	hasVMI?: SelectItem;
	position?: SelectItem[];
	positionType?: SelectItem[];
	dateStartPeriodStart?: Date;
	dateStartPeriodEnd?: Date;
	onProbationPeriod: SelectItem;
	workLengthDiapazoneStart: number;
	workLengthDiapazoneEnd: number;

	// TODO переделать это
	public PatchValue(model : EmployeeFilter){
		this.organization = model.organization;
		this.departmentList = model.departmentList;
		this.ageDiapazoneStart = model.ageDiapazoneStart;
		this.ageDiapazoneEnd = model.ageDiapazoneEnd;
		this.sex = model.sex;
		this.hasVMI = model.hasVMI;
		this.position = model.position;
		this.positionType = model.positionType;
		this.dateStartPeriodStart = model.dateStartPeriodStart;
		this.dateStartPeriodEnd = model.dateStartPeriodEnd;
		this.onProbationPeriod = model.onProbationPeriod;
		this.workLengthDiapazoneStart = model.workLengthDiapazoneStart;
		this.workLengthDiapazoneEnd = model.workLengthDiapazoneEnd;
	}
}