import { Component, ComponentRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OrganizationLIstOptionsService } from './organizationListOptions.service';
import { OrganizationListDataService } from './organizationListData.service';
import { Organization } from './organization';
import { Guid } from 'guid-typescript';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { OrganizationFormComponent } from './organizationForm/organizationForm.component';
import { GridComponent } from 'src/app/modules/shared/module-frontend/forc-grid/grid.component';

@Component({
	selector: 'app-organization-list',
	templateUrl: 'organizationList.component.html'
})
export class OrganizationListComponent {
    @ViewChild(GridComponent, {static: false}) grid : GridComponent<Organization>;

    public addButtonDisabled = false;
    public editButtonDisabled = false;
    public deleteButtonDisabled = false;

    @Input()
    public userId?: Guid;

	@Output() dataLoaded = new EventEmitter<Organization[]>;

	constructor(public gridOptionService: OrganizationLIstOptionsService,
        public gridDataService: OrganizationListDataService,
        public modalService: ModalWindowService
	){

	}

	add(){
		this.modalService.openWithTwoButtons(
			OrganizationFormComponent,
			'Создать организацию',
			'md',
			true,
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				console.log(componentRef.instance.modelId);
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}

	edit(){
		this.modalService.openWithTwoButtons(
			OrganizationFormComponent,
			'Редактировать организацию',
			'md',
			true,
			() => {

			},
			() => {
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}

	delete(){

	}

	onRowDoubleClick = () => {
		this.edit();
	};

	gridDataLoaded(data: Organization[]){
		this.dataLoaded.emit(data);
	}
}