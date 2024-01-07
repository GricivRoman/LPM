import { BaseEntity } from 'src/app/modules/shared/models/baseEntity';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';

export class Employee extends BaseEntity {
	/* ФИО */
	name: string;

	/* Пол */
	sex: SelectItem;

	/* Дата рождения */
	birthDate: Date;

	/* Рабочее место */
	workPlace: string;

	/* Есть ДМС */
	hasVHI: boolean;
}