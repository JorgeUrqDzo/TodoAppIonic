import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the NewTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-new-todo",
  templateUrl: "new-todo.html"
})
export class NewTodoPage {
  nombre;
  descripcion;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController
  ) {}

  ionViewDidLoad() {}

  saveItem() {
    let newItem = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      hecho: false
    };

    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }
}
