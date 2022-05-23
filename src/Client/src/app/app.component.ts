import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Item } from './Item'
import { ItemService } from './Item.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService]
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any> | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any> | undefined;


  editedItem: Item | null = null;
  items: Array<Item>;
  isNewRecord: boolean = false;
  statusMessage: string = "";
  status: boolean = false;

  constructor(private serv: ItemService) {
    this.items = new Array<Item>();
  }

  ngOnInit() {
    this.loadItems();
  }

  private loadItems() {
    try {
      this.serv.getItems().subscribe((data: Array<Item>) => {
        this.items = data.sort();
        console.log(`Got items from server: ${JSON.stringify(this.items)}`);
      });
    }
    catch {
      console.error('Failed to connect to server');
    }
  }

  addItem() {
    this.editedItem = new Item(0, "", 0, false);
    this.items.push(this.editedItem);
    this.isNewRecord = true;
  }

  editItem(item: Item) {
    this.editedItem = new Item(item.id, item.purchase, item.price, item.done);
  }

  loadTemplate(item: Item) {
    if (this.editedItem && this.editedItem.id === item.id) {
      return this.editTemplate as TemplateRef<any> | null;
    } else {
      return this.readOnlyTemplate as TemplateRef<any> | null;
    }
  }

  saveItem() {
    if (this.isNewRecord) {
      var result = this.serv.createItem(this.editedItem as Item);
      if (result) {
        this.statusMessage = 'Данные успешно добавлены';
        this.status = true;
        this.loadItems();
      }
      else {
        this.statusMessage = 'Произошла ошибка';
        this.status = false;
        this.loadItems();
      }

      this.isNewRecord = false;
      this.editedItem = null;
    } else {
      this.serv.updateItem(this.editedItem as Item).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
        this.status = true;
        this.loadItems();
      });
      this.editedItem = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.items.pop();
      this.isNewRecord = false;
    }
    this.editedItem = null;
  }

  deleteItem(item: Item) {
    this.serv.deleteItem(item.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
      this.status = true,
      this.loadItems();
    });
  }
}