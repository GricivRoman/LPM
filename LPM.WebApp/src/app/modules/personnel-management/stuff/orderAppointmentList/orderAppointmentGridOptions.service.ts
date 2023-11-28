import { Injectable } from '@angular/core';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { Column } from 'devextreme/ui/data_grid';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';
import { ColumnCellTemplateData } from 'devextreme/ui/tree_list';

@Injectable()
export class OrderAppointmentGridOptionsService implements GridOptionsService {
	getColumns(): Column[] {
		return [
			{
				dataField: 'organization.value',
				caption: 'Организация',
				dataType: 'string',
				width: 100
			},
			{
				dataField: 'department.value',
				caption: 'Отдел',
				dataType: 'string',
				width: 130
			},
			{
				dataField: 'position',
				caption: 'Должность',
				dataType: 'string',
				width: 150
			},
			{
				dataField: 'dateStart',
				caption: 'Начало',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 80
			},
			{
				dataField: 'oficialDateStart',
				caption: 'Офф. начало',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 80
			},
			{
				dataField: 'probationEndDate',
				caption: 'Окончание исп. срока',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 80
			},
			{
				dataField: 'dateEnd',
				caption: 'Окончание',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 60
			},
			{
				dataField: 'workLength',
				caption: 'Стаж',
				dataType: 'number',
				width: 80
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