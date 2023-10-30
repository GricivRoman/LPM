import { Injectable } from '@angular/core';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { Column } from 'devextreme/ui/data_grid';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';

@Injectable()
export class OrderAppointmentGridOptionsService implements GridOptionsService {
	getColumns(): Column[] {
		return [
			{
				dataField: 'organization.value',
				caption: 'Организация',
				dataType: 'string',
				width: 120
			},
			{
				dataField: 'department.value',
				caption: 'Отдел',
				dataType: 'string',
				width: 120
			},
			{
				dataField: 'position',
				caption: 'Должность',
				dataType: 'string',
				width: 120
			},
			{
				dataField: 'dateStart',
				caption: 'Начало',
				dataType: 'date',
				width: 100
			},
			{
				dataField: 'oficialDateStart',
				caption: 'Офф. начало',
				dataType: 'date',
				width: 100
			},
			{
				dataField: 'probationEndDate',
				caption: 'Окончание исп. срока',
				dataType: 'date',
				width: 100
			},
			{
				dataField: 'dateEnd',
				caption: 'Окончание',
				dataType: 'date',
				width: 100
			}
		];
	}

	getGridOptions(): GridOptions{
		const options = new GridOptions();
		options.columns = this.getColumns();
		options.selectionMode = GridSelectionModeStates.single;
		options.columnAutoWidth = false;
		return options;
	}
}