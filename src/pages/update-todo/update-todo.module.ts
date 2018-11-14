import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UpdateTodoPage } from "./update-todo";

@NgModule({
  declarations: [UpdateTodoPage],
  entryComponents: [UpdateTodoPage],
  imports: [IonicPageModule.forChild(UpdateTodoPage)]
})
export class UpdateTodoPageModule {}
