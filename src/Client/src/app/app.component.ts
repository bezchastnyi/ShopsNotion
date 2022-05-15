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

  constructor(private http: HttpClient) {
    this.read();
  }

  addItem(text: string, price: number): void {
    if (text == null || text.trim() == "" || price == null)
      return;


      this.http.get<any>(`https://localhost:5001/Write/1/${text}/false/${price}`, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }).subscribe(x =>{
        console.log(x)
      });
      this.read();
  }

  read() {
    this.http.get<Item[]>('https://localhost:5001/Read', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe(products => {
      this.items = products as Item[];
    });
  }
}