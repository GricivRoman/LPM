export enum EmployeeTypeEnum {
    manager = 1,
    officeWorker = 2,
	factoryWorker = 3
}

export class EmployeeTypeEnumDictionary {
	public static list : Map<EmployeeTypeEnum, string> = new Map<EmployeeTypeEnum, string>([
		[EmployeeTypeEnum.manager, 'Управленческий персонал'],
		[EmployeeTypeEnum.officeWorker, 'Административный персонал'],
		[EmployeeTypeEnum.factoryWorker, 'Производственный персонал']
	]);
}