import { BaseEntity } from 'src/app/modules/shared/models/baseEntity';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';

export class Department extends BaseEntity {
	/* Наименование */
	name : string;

	/* Краткое наименование */
	shortName: string;

	/* Описание */
	description: string;

	/* Организация */
	organizadion: SelectItem;

	/* Количество сотрудников */
	employeesNumber: number;
}