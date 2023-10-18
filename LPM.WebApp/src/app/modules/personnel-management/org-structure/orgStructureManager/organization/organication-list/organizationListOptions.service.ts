import { Injectable } from '@angular/core';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { Column } from 'devextreme/ui/data_grid';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';

@Injectable()
export class OrganizationLIstOptionsService implements GridOptionsService {
	getColumns(): Column[] {
		return [{
			dataField: 'shortName',
			caption: 'Наименование',
			dataType: 'string',
			width: 140
		},
		{
			dataField: 'employeesCount',
			caption: 'Кол-во сотрудников',
			dataType: 'number',
			format: {
				precision: 0
			},
			width: 170
		},
		{
			dataField: 'mainOrganization',
			caption: 'Основная',
			dataType: 'boolean',
			width: 100
		}
		];
	}
	getGridOptions(): GridOptions{
		const options = new GridOptions();
		options.columns = this.getColumns();
		options.selectionMode = GridSelectionModeStates.single;
		options.columnAutoWidth = false;
		options.gridWidth = '410';
		return options;
	}
}