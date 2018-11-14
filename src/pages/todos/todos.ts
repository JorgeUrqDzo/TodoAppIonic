import { TodosProvider } from "./../../providers/todos/todos";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { NewTodoPage } from "../new-todo/new-todo";
import { UpdateTodoPage } from "../update-todo/update-todo";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-todos",
  templateUrl: "todos.html"
})
export class TodosPage {
  categotyId = 0;
  todos: any = [];
  somthingToShow = true;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: TodosProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();

    this.categotyId = this.navParams.get("category").id;
    this.getTodos();
  }

  doRefresh(refresher) {
    this.service
      .getAll(this.categotyId)
      .then(data => {
        this.todos = data;
        if (!Array.isArray(data) || !data.length) {
          this.somthingToShow = false;
        } else {
          this.somthingToShow = true;
        }
        refresher.complete();
      })
      .catch(err => {
        refresher.cancel();
      });
  }

  getTodos() {
    this.service.getAll(this.categotyId).then(data => {
      this.todos = data;
      if (!Array.isArray(data) || !data.length) {
        this.somthingToShow = false;
        this.loading.dismiss();
      } else {
        this.loading.dismiss();
      }
    });
  }

  saveItem(todo) {
    this.service.add(this.categotyId, todo).then(data => {
      this.getTodos();
    });
  }

  addTodo() {
    let addModal = this.modalCtrl.create(NewTodoPage);

    addModal.onDidDismiss(item => {
      if (item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  todoDone($event, todo) {
    todo["hecho"] = true;
    this.service.update(this.categotyId, todo.id, todo).then(data => {
      this.getTodos();
    });
  }

  showConfirm(todo) {
    const confirm = this.alertCtrl.create({
      title: "Eliminar",
      message: '¿Quieres ELIMINAR la Item "' + todo.nombre.toUpperCase() + '"?',
      buttons: [
        {
          text: "No",
          handler: () => {}
        },
        {
          text: "Si, Eliminar",
          handler: () => {
            this.service.delete(this.categotyId, todo.id).then(data => {
              this.getTodos();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  itemPress($event, todo) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Acciones",
      buttons: [
        {
          text: "Editar",
          icon: "create",
          handler: () => {
            let addModal = this.modalCtrl.create(UpdateTodoPage, {
              categoryId: this.categotyId,
              todoId: todo.id
            });

            addModal.onDidDismiss(item => {
              if (item) {
                this.service
                  .update(this.categotyId, item.id, item)
                  .then(data => {
                    this.getTodos();
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
            this.showConfirm(todo);
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
}
