import { CategoriesProvider } from './../../providers/categories/categories';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";

/**
 * Generated class for the UpdateCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-update-category",
  templateUrl: "update-category.html"
})
export class UpdateCategoryPage {
  nombre: string;
  categoryId = 0;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public view: ViewController,
    private service: CategoriesProvider) {
    this.categoryId = params.get('id');
    this.getById();
  }

  getById(){
    this.service.getById(this.categoryId).then((result) => {
      this.nombre = result['nombre'];
    });
  }

  saveItem() {
    let newItem = {
      id: this.categoryId,
      nombre: this.nombre
    };

    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }
}
