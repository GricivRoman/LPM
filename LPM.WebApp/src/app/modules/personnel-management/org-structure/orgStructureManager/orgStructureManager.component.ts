import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AuthLocalStorageService } from 'src/app/modules/shared/local-storage/auth-localStorage/authLocalStorage.service';

@Component({
	selector: 'app-org-structure-manager',
	templateUrl: 'orgStructureManager.component.html'
})
export class OrgStructureManagerComponent {
	userId?: Guid;

	constructor(private AuthLocalStorageService: AuthLocalStorageService){
		this.userId = AuthLocalStorageService.authInfo?.userId;
	}
}