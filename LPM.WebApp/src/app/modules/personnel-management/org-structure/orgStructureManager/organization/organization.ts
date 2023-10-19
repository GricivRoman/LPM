import { BaseEntity } from 'src/app/modules/shared/models/baseEntity';

export class Organization extends BaseEntity {
	/* Наименование */
	name: string;

	/* Сокращенное наименование */
	shortName: string;

	/* Основная организация пользователя */
	isMainOrganization: boolean;

	/* Дата создания */
	creationDate?: Date;

	/* Количество сотрудников */
	employeesNumber: number;
}