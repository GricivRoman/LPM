import { SelectItem } from '../../models/selectItem';
import { PagedQueryFilter } from '../pagedQueryFilter';

export class EmployeeFilter extends PagedQueryFilter {
	organization?: SelectItem;
	department?: SelectItem[];
	ageDiapazoneStart?: number;
	ageDiapazoneEnd?: number;
	sex?: SelectItem;
	hasVMI?: boolean;
	position?: SelectItem[];
	positionType?: SelectItem[];
	dateStartPeriodStart?: Date;
	dateStartPeriodEnd?: Date;
	onProbationPeriod: boolean;
	workLengthDiapazoneStart: number;
	workLengthDiapazoneEnd: number;

	// TODO переделать это
	public PatchValue(model : EmployeeFilter){
		this.organization = model.organization;
		this.department = model.department;
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