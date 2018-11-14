import { TodosProvider } from "./../../providers/todos/todos";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the UpdateTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-update-todo",
  templateUrl: "update-todo.html"
})
export class UpdateTodoPage {
  todoId = 0;
  categoryId = 0;
  nombre = "";
  descripcion = "";
  hecho = false;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public view: ViewController,
    private service: TodosProvider
  ) {
    this.categoryId = params.get("categoryId");
    this.todoId = params.get("todoId");
    this.getById();
  }

  getById() {
    this.service.getById(this.categoryId, this.todoId).then(result => {
      this.nombre = result["nombre"];
      this.descripcion = result["descripcion"];
      this.hecho = result['hecho'];
    });
  }

  saveItem() {
    let newItem = {
      id: this.todoId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      hecho: this.hecho
    };

    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }
}
