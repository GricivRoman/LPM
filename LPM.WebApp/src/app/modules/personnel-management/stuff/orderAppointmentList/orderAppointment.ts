import { BaseEntity } from 'src/app/modules/shared/models/baseEntity';
import { SelectItem } from 'src/app/modules/shared/models/selectItem';

export class OrderAppointment extends BaseEntity {
	/* Отдел */
	department: SelectItem;

	/* Дата начала работы фактическая */
	dateStart: Date;

	/* Дата начала работы официально */
	oficialDateStart?: Date;

	/* Дата окончания испытательного срока */
	probationEndDate?: Date;

	/* Дата окончания исполнения обязанностей по договору */
	dateEnd?: Date;

	/* Должность */
	position?: string;

	/* Тип сотрудника */
	employeeType: SelectItem;
}