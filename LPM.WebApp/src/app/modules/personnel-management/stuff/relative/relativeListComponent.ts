import { Component, ComponentRef, Inject } from '@angular/core';
import { FormWithGridComponent } from 'src/app/modules/shared/base-components/formWithGrid.component';
import { Relative } from './relative';
import { RelativeFormComponent } from './relativeForm/relativeFormComponent';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { RelativeGridDataService } from './relativeGridData.service';
import { RelativeGridOptionsService } from './relativeGridOptions.service';
import { ModalWindowService } from 'src/app/modules/shared/module-frontend/forc-popup/modalWindow.service';
import { AlertService } from 'src/app/modules/shared/module-frontend/forc-alert/alert.service';
import { ApiValidationErrorsResolvingService } from 'src/app/modules/shared/services/apiValidationErrorsResolving.service';
import { OrganizationLocalStorageService } from 'src/app/modules/shared/local-storage/organization-localStorage/organizationLocalStorage.service';
import { Guid } from 'guid-typescript';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-relative-list',
	templateUrl: 'relativeListComponent.html',
	providers: [
		{provide: 'RelativeDataService',useClass: DataService},
		RelativeGridDataService,
		RelativeGridOptionsService,
		ModalWindowService
	]
})

export class RelativeListComponent extends FormWithGridComponent<Relative, RelativeFormComponent> {

	public employeeId: Guid;

	constructor(public override gridOptionService: RelativeGridOptionsService,
        public override gridDataService: RelativeGridDataService,
        public override modalService: ModalWindowService,
		@Inject('RelativeDataService')public override dataService: DataService<Relative>,
		public override alertService: AlertService,
		protected errorResolvingService: ApiValidationErrorsResolvingService,
		protected organizationLocalStorageService: OrganizationLocalStorageService
	){
		super(modalService, dataService, alertService);

		dataService.url = 'relative';
		this.gridOptionService = gridOptionService;
		this.gridDataService = gridDataService;
	}

	protected override defaultInitAction(componentRef: ComponentRef<RelativeFormComponent>, popupRef: NgbModalRef){
		super.defaultInitAction(componentRef, popupRef);
		componentRef.instance.employeeId = this.employeeId;
	}

	add(){
		this.openModal(RelativeFormComponent, 'Добавить родственника', 'sm', this.creationWindowInitAction);
	}

	edit(){
		this.openModal(RelativeFormComponent, 'Карточка родственника', 'sm', this.editingWindowInitAction);
	}
}