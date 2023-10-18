import { Component, ComponentRef, EventEmitter, Input, Output, ViewChild, Inject } from '@angular/core';
import { OrganizationLIstOptionsService } from './organizationListOptions.service';
import { OrganizationListDataService } from './organizationListData.service';
import { Organization } from './organization';
import { Guid } from 'guid-typescript';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { OrganizationFormComponent } from './organizationForm/organizationForm.component';
import { GridComponent } from 'src/app/modules/shared/module-frontend/forc-grid/grid.component';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { AlertDialogStates } from 'src/app/modules/shared/module-frontend/forc-alert/alertDialogStates';

@Component({
	selector: 'app-organization-list',
	templateUrl: 'organizationList.component.html',
	providers: [{provide: 'DataService', useClass: DataService}]
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
        public modalService: ModalWindowService,
		@Inject('DataService')private dataService: DataService<Organization>,
		private alertService: AlertService
	){
		dataService.url = 'organization';
	}

	add(){
		this.modalService.openWithTwoButtons(
			OrganizationFormComponent,
			'Создать организацию',
			'md',
			true,
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				this.setApiUrl(componentRef);
				componentRef.instance.modelId = this.userId;
			},
			(componentRef: ComponentRef<OrganizationFormComponent>, popupRef) => {
				componentRef.instance.save(() => {
					this.grid.refresh();
					popupRef.close();
				});
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
			(componentRef: ComponentRef<OrganizationFormComponent>) => {
				componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
				this.setApiUrl(componentRef);
				componentRef.instance.ngOnInit();
			},
			(componentRef: ComponentRef<OrganizationFormComponent>, popupRef) => {
				componentRef.instance.save(() => {
					this.grid.refresh();
					popupRef.close();
				});
			},
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}

	delete(){
		this.dataService.delete(this.grid.getSelectedRowsKeys()[0]).subscribe({
			next: () => {
				this.grid.refresh();
			},
			error: (errResponse: HttpErrorResponse) => {
				console.error(errResponse);
				this.alertService.showMessage(JSON.stringify(errResponse.error), AlertDialogStates.error);
			}
		});
	}

	onRowDoubleClick = () => {
		this.edit();
	};

	gridDataLoaded(data: Organization[]){
		this.dataLoaded.emit(data);
	}

	setApiUrl(componentRef: ComponentRef<OrganizationFormComponent>){
		componentRef.instance.apiUrl = this.dataService.url;
		componentRef.instance.refreshDataServiceUrl();
	}
}