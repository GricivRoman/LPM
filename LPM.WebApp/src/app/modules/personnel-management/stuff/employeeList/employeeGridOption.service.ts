import { Injectable } from '@angular/core';
import { Column } from 'devextreme/ui/data_grid';
import { GridSelectionModeStates } from 'src/app/modules/shared/module-frontend/forc-grid/gridElementsModeStates';
import { GridOptions } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.component';
import { GridOptionsService } from 'src/app/modules/shared/module-frontend/forc-grid/grid-options.service';
import { ColumnCellTemplateData } from 'devextreme/ui/tree_list';
import { EmployeeTypeEnum, EmployeeTypeEnumDictionary } from 'src/app/modules/shared/enums/employeeTypeEnum';
import { SexEnum, SexEnumDictionary } from 'src/app/modules/shared/enums/sexEnum';

@Injectable()
export class EmployeeGridOptionService implements GridOptionsService {
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
				width: 130
			},
			{
				dataField: 'age',
				alignment: 'left',
				caption: 'Возраст',
				dataType: 'number',
				width: 80
			},
			{
				dataField: 'workPlace',
				caption: 'Рабочее место',
				dataType: 'string',
				width: 100
			},
			{
				dataField: 'sex.value',
				caption: 'Пол',
				dataType: 'string',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(!cellInfo?.value){
						return;
					}

					const typeId = Object.entries(SexEnum).find(([, val]) => (val as string).toLowerCase() === (cellInfo.value as string).toLowerCase())?.[0];

					if(typeId){
						cellelement.innerHTML = (SexEnumDictionary.list.get(JSON.parse(typeId)) as string)[0];
					}
				},
				width: 80
			},
			{
				dataField: 'actualDepartmentName',
				caption: 'Отдел',
				dataType: 'string',
				width: 250
			},
			{
				dataField: 'actualPosition',
				caption: 'Должность',
				dataType: 'string',
				width: 250
			},
			{
				dataField: 'actualDateStart',
				caption: 'Дата начала',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 120
			},
			{
				dataField: 'actualOficialDateStart',
				caption: 'Дата офф. трудоустройсва',
				dataType: 'date',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 120
			},
			{
				dataField: 'actualProbationEndDate',
				caption: 'Окончание испытательного срока',
				dataType: 'date',
				calculateCellValue:
				(rowData: any) => {
					if(rowData.actualProbationEndDate){
						const date = new Date(rowData.actualProbationEndDate);
						return date.getTime() > new Date().getTime() ? date : null;
					}
					return null;
				},
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(cellInfo.value){
						const date = new Date(cellInfo.value);
						cellelement.innerHTML = date.toLocaleDateString('ru');
					}
				},
				width: 100
			},
			{
				dataField: 'actualEmployeeTypeName',
				caption: 'Тип должности',
				cellTemplate: (cellelement: HTMLElement, cellInfo: ColumnCellTemplateData) => {
					if(!cellInfo?.value){
						return;
					}

					const typeId = Object.entries(EmployeeTypeEnum).find(([, val]) => (val as string).toLowerCase() === (cellInfo.value as string).toLowerCase())?.[0];

					if(typeId){
						cellelement.innerHTML = EmployeeTypeEnumDictionary.list.get(JSON.parse(typeId)) as string;
					}
				},
				dataType: 'string',
				width: 140
			},
			{
				dataField: 'actualWorkLength',
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
		options.gridWidth = '1705';
		options.showPager = true;
		return options;
	}
}