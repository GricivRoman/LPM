import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { OrganizationSelectService } from "./organizationSelect.service";
import { DataService } from "../../services/data.service";

@Component({
    selector: 'app-select-organization',
    template: `
        <app-select-single
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select-single>
    `,
    providers:[OrganizationSelectService, { provide: 'OS_DataService', useClass: DataService }]
})
export class OrganizationSelectComponent {
    @Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	constructor(public selectService: OrganizationSelectService){
	}
}