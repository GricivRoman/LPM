import { BaseEntity } from 'src/app/modules/shared/models/baseEntity';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';
import { Guid } from 'guid-typescript';

export class Relative extends BaseEntity {
	/* ФИО */
	name: string;

	/* Пол */
	sex: SelectItem;

	/* Дата рождения */
	birthDate: Date;

	/* Вид родства */
	relativeKind: string;

	/* Дошкольник */
	isPreSchoolkid: boolean;

	/* Школьник */
	isSchoolkid: boolean;

	/* Инвалидность */
	isCripple: boolean;

	/* Сотрудники родственники */
	employeeId: Guid;
}