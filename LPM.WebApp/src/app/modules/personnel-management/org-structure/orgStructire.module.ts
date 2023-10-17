import { NgModule } from "@angular/core";
import { OrgStructureManagerComponent } from "./orgStructureManager/orgStructureManager.component";
import { OrgStructureRoutingModule } from "./org.structure-routing-module";

@NgModule({
    imports: [
        OrgStructureRoutingModule
    ],
    declarations: [
        OrgStructureManagerComponent
    ],
    providers: [

    ]
})
export class OrgStructureModule {

}