import { Injectable } from '@angular/core';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { Column } from 'devextreme/ui/data_grid';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';

@Injectable()
export class OrderAppointmentGridOptionsService implements GridOptionsService {
	// TODO придумать как вынести стилизацию дат либо в типы либо в отдельную реализацию конвертера
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
				calculateCellValue:
				(rowData) => {
					if(!rowData.dateStart){
						return;
					}
					const date = new Date(rowData.dateStart);
					return date.toLocaleDateString('ru');
				},
				width: 100
			},
			{
				dataField: 'oficialDateStart',
				caption: 'Офф. начало',
				dataType: 'date',
				calculateCellValue:
				(rowData) => {
					if(!rowData.oficialDateStart){
						return;
					}
					const date = new Date(rowData.oficialDateStart);
					return date.toLocaleDateString('ru');
				},
				width: 100
			},
			{
				dataField: 'probationEndDate',
				caption: 'Окончание исп. срока',
				dataType: 'date',
				calculateCellValue:
				(rowData) => {
					if(!rowData.probationEndDate){
						return;
					}
					const date = new Date(rowData.probationEndDate);
					return date.toLocaleDateString('ru');
				},
				width: 100
			},
			{
				dataField: 'dateEnd',
				caption: 'Окончание',
				dataType: 'date',
				calculateCellValue:
				(rowData) => {
					if(!rowData.dateEnd){
						return;
					}
					const date = new Date(rowData.dateEnd);
					return date.toLocaleDateString('ru');
				},
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