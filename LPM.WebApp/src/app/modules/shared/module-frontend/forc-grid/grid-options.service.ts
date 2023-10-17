import { Column } from 'devextreme/ui/data_grid';
import { GridOptions } from './grid-options.component';

export interface GridOptionsService {
    getColumns(): Column[];
    getGridOptions(): GridOptions;
}