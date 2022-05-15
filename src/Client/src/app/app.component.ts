import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

class Item {
  purchase: string;
  done: boolean;
  price: number;

  constructor(purchase: string, price: number) {

    this.purchase = purchase;
    this.price = price;
    this.done = false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: string = "";
  price: number = 0;
  items: Item[] = [];
  /*items: Item[] =
      [
        { purchase: "Хлеб", done: false, price: 15.9 },
        { purchase: "Масло", done: false, price: 60 },
        { purchase: "Картофель", done: true, price: 22.6 },
        { purchase: "Сыр", done: false, price: 310 }
      ];*/

  constructor(private http: HttpClient) {
    this.read();
  }

  addItem(text: string, price: number): void {
    if (text == null || text.trim() == "" || price == null)
      return;

      console.log(`https://localhost:5001/Write/${price}/${text}/${false}/${price}`);
      this.http.get<any>(`https://localhost:5001/Write/${price}/${text}/${false}/${price}`, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      });
      console.log("ff");
      this.read();

    //this.items.push(new Item(text, price));
  }

  read() {
    this.http.get<Item[]>('https://localhost:5001/Read', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe(x => {
      this.items = x as Item[];
    });
  }
}