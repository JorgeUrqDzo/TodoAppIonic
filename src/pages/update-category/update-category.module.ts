import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UpdateCategoryPage } from "./update-category";

@NgModule({
  declarations: [UpdateCategoryPage],
  entryComponents: [UpdateCategoryPage],
  imports: [IonicPageModule.forChild(UpdateCategoryPage)]
})
export class UpdateCategoryPageModule {}
