import { Column } from 'devextreme/ui/data_grid';

export class GridOptions {
	columns: Column[];
	selectionMode?: string;
	gridWidth?: string;
	allowColumnResizing?: true;
	columnMinWidth?: number;
	columnAutoWidth?: boolean;
	pageSize?: number;
	allowGrouping?: boolean;
	autoNavigateToFocusedRow?: boolean;
	showSearchPanel?: boolean;
	showPager: boolean = false;
}