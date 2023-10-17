import { Observable } from 'rxjs';
import { BaseEntity } from '../../models/baseEntity';

export interface GridDataService<TClass extends BaseEntity> {
    getGridData(): Observable<TClass[]>;
}