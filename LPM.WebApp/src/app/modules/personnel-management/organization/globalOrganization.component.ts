import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SelectItem } from '../../shared/models/selectItem';
import { FormControl } from '@angular/forms';
import { OrganizationSelectService } from '../../shared/select-controls/organization-select/organizationSelect.service';
import { DataService } from '../../shared/services/data.service';
import { OrganizationLocalStorageService } from '../../shared/local-storage/organization-localStorage/organizationLocalStorage.service';
import { OrganizationFilter } from '../../shared/filters/organizationFilter';
import { AuthLocalStorageService } from '../../shared/local-storage/auth-localStorage/authLocalStorage.service';
import { AuthResponse } from '../../shared/local-storage/auth-localStorage/auth-response';
import { SelectComponent } from '../../shared/module-frontend/forc-select/select-single/select.component';
import { FillerService } from '../filler/filler.service';

@Component({
	selector: 'app-global-organization-select',
	templateUrl: 'globalOrganization.component.html',
	providers: [{provide: 'OrganizationSelectService', useClass: OrganizationSelectService}, { provide: 'OS_DataService', useClass: DataService },]
})
export class GlobalOrganizationComponent implements OnInit, AfterViewInit{
	@ViewChild(SelectComponent, {static: false}) selector: SelectComponent;
	organization = new FormControl<SelectItem>(new SelectItem());

	constructor(
        @Inject('OrganizationSelectService') public selectService: OrganizationSelectService,
        private organizationLocalStorageService: OrganizationLocalStorageService,
        private authLocalStorageService: AuthLocalStorageService,
		private fillerService: FillerService)
	{}

	ngOnInit(){
		this.organization.valueChanges.subscribe((val) => this.changeGlobalOrganization(val));
		this.organizationLocalStorageService.$globalOrganization.subscribe((org: SelectItem | null) => {
			if(!org){
				this.organization.setValue(null, {emitEvent: false});
			}
		});

		if(this.organizationLocalStorageService.globalOrganization == null){
			this.fillerService.dataFromFileHasFilled$.subscribe(() => {
				this.setMainOrganization();
			});
		}
	}

	ngAfterViewInit(): void {
		this.authLocalStorageService.$authInfo.subscribe((authInfo: AuthResponse | null) => {
			if(!authInfo){
				this.selector.resetSelectList();
				this.organizationLocalStorageService.clearGlobalOrganization();
			} else {
				setTimeout(() => {
					this.setMainOrganization();
				}, 0);
			}
		});
	}

	private changeGlobalOrganization(organization: SelectItem | null){
		if(organization){
			this.organizationLocalStorageService.globalOrganization = organization;
		} else {
			this.organizationLocalStorageService.clearGlobalOrganization();
		}
	}

	public setMainOrganization(){
		const storedOrg = this.organizationLocalStorageService.globalOrganization;
		if(storedOrg != null){
			this.organization.setValue({id: storedOrg.id, value: storedOrg.value});
		} else {
			const filter = new OrganizationFilter();
			filter.takeOnlyMainOrganization = true;
			filter.paging.pageSize = 1;
			this.selectService.getMainOrganization(filter).subscribe((organizations) => {
				if(organizations){
					this.organization.patchValue(organizations[0]);
					this.selector.selectList = [organizations[0]];
				}
			});
		}
	}
}