import { Observable } from 'rxjs';
import { SelectItem } from '../../models/selectItem';

export interface SelectService {
    getItemList(): Observable<SelectItem[]>;
}