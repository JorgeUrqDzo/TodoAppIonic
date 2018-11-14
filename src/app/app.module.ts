import { TodosPageModule } from "./../pages/todos/todos.module";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule,
  Config
} from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { CategoriesProvider } from "../providers/categories/categories";
import { TodosProvider } from "../providers/todos/todos";
import { HttpClientModule } from "@angular/common/http";
import { AddCategoryPageModule } from "../pages/add-category/add-category.module";
import { NewTodoPageModule } from "../pages/new-todo/new-todo.module";
import { UpdateCategoryPageModule } from "../pages/update-category/update-category.module";
import { UpdateTodoPageModule } from "../pages/update-todo/update-todo.module";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AddCategoryPageModule,
    UpdateCategoryPageModule,
    TodosPageModule,
    NewTodoPageModule,
    UpdateTodoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoriesProvider,
    TodosProvider
  ]
})
export class AppModule {
  constructor(public config: Config) {
    // config.set("apiUrl", "http://192.168.1.76:5000/api");
    config.set("apiUrl", "http://localhost:5000/api");
  }
}
