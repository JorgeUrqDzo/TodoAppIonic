import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../../models/todo";
import { Config } from "ionic-angular";

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class TodosProvider {
  api = "";

  constructor(public http: HttpClient, public config: Config) {
    this.api = config.get("apiUrl") + "/Categorias";
  }

  getAll(categoryId: number) {
    return new Promise(resolve => {
      this.http.get(this.api + "/" + categoryId + "/todos").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getById(categoryId: number, id: number) {
    return new Promise(resolve => {
      this.http.get(this.api + "/" + categoryId + "/todos/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  add(categoryId: number, newTodo: Todo) {
    return new Promise(resolve => {
      this.http.post(this.api + "/" + categoryId + "/todos/", newTodo).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  update(categoryId: number, id: number, todo: Todo) {
    return new Promise(resolve => {
      this.http.put(this.api + "/" + categoryId + "/todos/" + id, todo).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  delete(categoryId: number, id: number) {
    return new Promise(resolve => {
      this.http.delete(this.api + "/" + categoryId + "/todos/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
