import { Component } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  ModalController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { CategoriesProvider } from "../../providers/categories/categories";
import { AddCategoryPage } from "../add-category/add-category";
import { TodosPage } from "../todos/todos";
import { UpdateCategoryPage } from "../update-category/update-category";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  categories: any = [];
  somthingToShow = true;

  loading: any;

  constructor(
    public navCtrl: NavController,
    public service: CategoriesProvider,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.getAll();
  }

  ionViewDidLoad() {}

  itemSelected(category) {
    this.navCtrl.push(TodosPage, {
      category: category
    });
  }

  doRefresh(refresher) {
    this.service
      .getAll()
      .then(data => {
        this.categories = data;
        if (!Array.isArray(data) || !data.length) {
          this.somthingToShow = false;
        }else{
          this.somthingToShow = true;
        }
        refresher.complete();
      })
      .catch(err => {
        refresher.cancel();
      });
  }

  getAll() {
    this.loading.present();
    this.service.getAll().then(data => {
      this.categories = data;
      if (!Array.isArray(data) || !data.length) {
        this.somthingToShow = false;
        this.loading.dismiss();
      } else {
        this.somthingToShow = true;
        this.loading.dismiss();
      }
      return true;
    });
  }

  saveItem(item) {
    this.service.add(item).then(data => {
      this.getAll();
    });
  }

  addCategory() {
    let addModal = this.modalCtrl.create(AddCategoryPage);

    addModal.onDidDismiss(item => {
      if (item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  itemPress($event, category) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Acciones",
      buttons: [
        {
          text: "Editar",
          icon: "create",
          handler: () => {
            let addModal = this.modalCtrl.create(UpdateCategoryPage, {
              id: category.id
            });

            addModal.onDidDismiss(item => {
              if (item) {
                this.service.update(category.id, item).then(data => {
                  this.getAll();
                });
              }
            });

            addModal.present();
          }
        },
        {
          text: "Eliminar",
          icon: "trash",
          role: "destructive",
          handler: () => {
            this.showConfirm(category);
          }
        },
        {
          text: "Cancelar",
          icon: "exit",
          role: "cancel",
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm(category) {
    const confirm = this.alertCtrl.create({
      title: "Eliminar",
      message:
        '¿Quieres ELIMINAR la categoria "' +
        category.nombre.toUpperCase() +
        '"?',
      buttons: [
        {
          text: "No",
          handler: () => {}
        },
        {
          text: "Si, Eliminar",
          handler: () => {
            this.service.delete(category.id).then(data => {
              this.getAll();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
