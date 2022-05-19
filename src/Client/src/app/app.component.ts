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
    try {
      this.read();
    }
    catch {
      console.error('Failed to connect to server');
    }
  }

  addItem(text: string, price: number): void {
    if (text == null || text.trim() == "" || price == null)
      console.error('text or price cannot be null');

    try {
      this.write(text, price);
      this.read();
    }
    catch {
      console.error('Failed to connect to server');
    }
  }

  write(text: string, price: number): void {
    if (text == null || text.trim() == "" || price == null)
      console.error('text or price cannot be null');

    this.http.get<any>(`https://localhost:5001/Write/${text}/false/${price}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe(x => {
      console.log(x)
    });
  }

  read(): void {
    this.http.get<Item[]>('https://localhost:5001/Read', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe(products => {
      this.items = products as Item[];
    });
  }
}