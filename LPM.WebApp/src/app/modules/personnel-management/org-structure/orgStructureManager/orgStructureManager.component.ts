import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { LocalStorageService } from 'src/app/modules/shared/local-storage/localStorage.service';

@Component({
	selector: 'app-org-structure-manager',
	templateUrl: 'orgStructureManager.component.html'
})
export class OrgStructureManagerComponent {
	userId?: Guid;

	constructor(private localStorageService: LocalStorageService){
		this.userId = localStorageService.authInfo?.userId;
	}
}