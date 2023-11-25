import { Injectable } from '@angular/core';
import { Column } from 'devextreme/ui/data_grid';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';

@Injectable()
export class EmployeeGridOptionService implements GridOptionsService {
	getColumns(): Column[] {
		return [
			{
				dataField: 'name',
				caption: 'ФИО',
				dataType: 'string',
				width: 300
			},
			{
				dataField: 'birthDate', // TODO сортировать по значению а не по итоговой строке
				caption: 'Дата рождения',
				dataType: 'date',
				calculateCellValue:
				(rowData) => {
					const date = new Date(rowData.birthDate);
					return date.toLocaleDateString('ru');
				},
				width: 140
			},
			{
				dataField: 'birthDate',
				caption: 'Возраст',
				dataType: 'number',
				calculateCellValue:
				(rowData) => {
					const age = Math.floor((new Date().getTime() - new Date(rowData.birthDate).getTime()) / (1000 * 3600 * 24 * 365));
					return age;
				},
				width: 100
			},
			{
				dataField: 'workPlace',
				caption: 'Рабочее место',
				dataType: 'string',
				width: 140
			},

		];
	}
	getGridOptions(): GridOptions{
		const options = new GridOptions();
		options.columns = this.getColumns();
		options.selectionMode = GridSelectionModeStates.single;
		options.columnAutoWidth = false;
		options.gridWidth = '680';
		options.showPager = true;
		return options;
	}
}