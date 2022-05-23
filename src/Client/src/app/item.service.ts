import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Item } from './Item';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemService {

  private baseUrl = "https://localhost:5001/";
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Array<Item>>(`${this.baseUrl}Read`);
  }

  createItem(item: Item): boolean {
    const myHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*");
    this.http.get(`${this.baseUrl}Write/${item.purchase}/${item.done}/${item.price}`, { headers: myHeaders, responseType:'text', observe: 'response' }).pipe(map(data => {
      
      console.log("Here will be return response code Ex :200", data.status)
      console.error(data.status);
      return data.status != 200 ? false : true;
        }));;
        return false;

    //return this.http.get(`${this.baseUrl}Write/${item.purchase}/${item.done}/${item.price}`, { headers: myHeaders });
  }

  updateItem(item: Item) {
    const myHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*");
    return this.http.get(`${this.baseUrl}Edit/${item.id}/${item.purchase}/${item.done}/${item.price}`, { headers: myHeaders });
  }

  deleteItem(id: number) {
    return this.http.get(`${this.baseUrl}Delete/${id}`);
  }
}