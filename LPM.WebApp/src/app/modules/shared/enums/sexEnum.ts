export enum SexEnum {
    male = 1,
    female = 2
}

export class SexEnumDictionary {
	public static list : Map<SexEnum, string> = new Map<SexEnum, string>([
		[SexEnum.male, 'Мужчина'],
		[SexEnum.female, 'Женщина']
	]);
}