import { Injectable } from '@angular/core';
import { Column } from 'devextreme/ui/data_grid';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';

@Injectable()
export class EmployeeGridOptionService {
	getColumns(): Column[] {
		return [
			{
				dataField: 'name',
				caption: 'ФИО',
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
		return options;
	}
}