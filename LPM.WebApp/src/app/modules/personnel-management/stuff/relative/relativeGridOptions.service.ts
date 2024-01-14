import { Injectable } from '@angular/core';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { Column, ColumnCellTemplateData } from 'devextreme/ui/data_grid';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';
import { SexEnum, SexEnumDictionary } from 'src/app/modules/shared/enums/sexEnum';

@Injectable()
export class RelativeGridOptionsService implements GridOptionsService{

	// TODO вынести функции cellTemplate в отдельную папку и переиспользовать их для всех дат и полов.
	getColumns(): Column[] {
		return [
			{
				dataField: 'name',
				caption: 'ФИО',
				dataType: 'string',
				width: 250
			},
			{
				dataField: 'birthDate',
				caption: 'Дата рождения',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				allowExporting: true,

				width: 130
			},
			{
				dataField: 'sex.value',
				caption: 'Пол',
				dataType: 'string',
				calculateCellValue(rowData) {
					if(rowData.sex){
						const typeId = Object.entries(SexEnum).find(([, val]) => (val as string).toLowerCase() === (rowData.sex.value as string).toLowerCase())?.[0];

						if(typeId){
							return (SexEnumDictionary.list.get(JSON.parse(typeId)) as string)[0];
						}
					}

					return;
				},
				width: 80
			},
		];
	}

	getGridOptions(): GridOptions {
		const options = new GridOptions();
		options.columns = this.getColumns();
		options.selectionMode = GridSelectionModeStates.single;
		options.columnAutoWidth = false;
		options.gridWidth = '465';
		options.showPager = false;
		return options;
	}
}