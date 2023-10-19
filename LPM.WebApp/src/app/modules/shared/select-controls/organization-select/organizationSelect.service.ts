import { Injectable, Inject } from "@angular/core";
import { SelectService } from "../../module-frontend/forc-select/select.service";
import { Observable } from "rxjs";
import { SelectItem } from "../../models/selectItem";
import { DataService } from "../../services/data.service";

@Injectable()
export class OrganizationSelectService implements SelectService {
    constructor(@Inject('OS_DataService') private dataService: DataService<SelectItem>){
        dataService.url = 'organization'
    }
    
    getItemList(): Observable<SelectItem[]>{
        return this.dataService.getSelectItemList();
    }
}