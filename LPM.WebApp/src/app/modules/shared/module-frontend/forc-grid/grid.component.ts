import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { GridSelectionModeStates } from './gridElementsModeStates';
import { GridOptionsService } from './grid-options.service';
import { Column } from 'devextreme/ui/data_grid';
import { GridDataService } from './grid-data.service';
import { BaseEntity } from '../../models/baseEntity';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-grid',
	templateUrl: 'grid.component.html',
	styleUrls: ['grid.component.css']
})
export class GridComponent<TClass extends BaseEntity> implements OnInit {
	@ViewChild(DxDataGridComponent, {static: false} ) grid: DxDataGridComponent;

	@Input()
	public optionsService: GridOptionsService;
	@Input()
	public dataService: GridDataService<TClass>;
	@Input()
	public onRowDblClick: () => void;

	@Output() gridDataLoaded = new EventEmitter<TClass[]>;

	public dataSource: TClass[];
	protected columns: Column[];
	protected gridWidth: string;
	protected selectionMode: string;
	protected allowColumnResizing: boolean;
	protected columnMinWidth: number;
	protected columnAutoWidth: boolean;
	protected pageSize: number;

	protected allowGrouping: boolean;
	protected expandAll = true;

	protected focusedRowKey: number;
	protected autoNavigateToFocusedRow: boolean;

	protected searchPanel = {
		highlightCaseSensitive: false,
		highlightSearchText: true,
		searchVisibleColumnsOnly: true,
		visible: false
	};

	ngOnInit() {
		const options = this.optionsService.getGridOptions();
		this.columns = options.columns;
		this.loadData();

		this.selectionMode = options.selectionMode ?? GridSelectionModeStates.multiple;
		this.gridWidth = options.gridWidth ?? '100%';
		this.pageSize = options.pageSize ?? 10;
		this.searchPanel.visible = options.showSearchPanel ?? false;

		this.allowColumnResizing = options.allowColumnResizing ?? true;
		this.columnMinWidth = options.columnMinWidth ?? 50;
		this.columnAutoWidth = options.columnAutoWidth ?? true;

		this.allowGrouping = options.allowGrouping ?? false;
		this.autoNavigateToFocusedRow = options.autoNavigateToFocusedRow ?? false;
	}

	public getSelectedRowsData() : TClass[] {
		return this.grid.instance.getSelectedRowsData();
	}

	public getSelectedRowsKeys(): Guid[] {
		return this.grid.instance.getSelectedRowKeys();
	}

	public toggleGrouping() {
		if(this.allowGrouping) {
			this.expandAll = !this.expandAll;
		}
	}

	public async refresh() {
		await this.loadData();
		this.grid.filterValue = null;
	}

	private async loadData() {
		await this.dataService.getGridData().subscribe((data) => {
			this.dataSource = data;
			this.gridDataLoaded.emit(data);
		});
	}
}