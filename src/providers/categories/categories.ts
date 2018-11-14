import { Category } from "./../../models/category";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "ionic-angular";

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CategoriesProvider {
  api = "";
  constructor(public http: HttpClient, public config: Config) {
    this.api = config.get("apiUrl") + "/Categorias";
  }

  getAll() {
    return new Promise(resolve => {
      this.http.get(this.api).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getById(id: number) {
    return new Promise(resolve => {
      this.http.get(this.api + "/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  add(newCategory: Category) {
    return new Promise(resolve => {
      this.http.post(this.api, newCategory).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  update(id: number, category: Category) {
    return new Promise(resolve => {
      this.http.put(this.api + "/" + id, category).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  delete(id: number) {
    return new Promise(resolve => {
      this.http.delete(this.api + "/" + id).subscribe(
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
