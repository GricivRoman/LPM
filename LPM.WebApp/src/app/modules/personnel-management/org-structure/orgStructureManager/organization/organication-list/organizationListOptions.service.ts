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
			dataField: 'employeesNumber',
			caption: 'Кол-во сотрудников',
			dataType: 'number',
			alignment: 'center',
			format: {
				precision: 0
			},
			width: 100
		},
		{
			dataField: 'isMainOrganization',
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
		options.gridWidth = '350';
		return options;
	}
}