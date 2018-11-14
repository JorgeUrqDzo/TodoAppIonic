import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  nombre: string;

  constructor(public navCtrl: NavController, public view: ViewController) {

  }

  saveItem(){

    let newItem = {
      nombre: this.nombre,
    };

    this.view.dismiss(newItem);

  }

  close(){
    this.view.dismiss();
  }

}
