import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit, OnDestroy {

  ListID: string;
  ListName: string;
  ListItems: Set<string> = new Set([]);
  Items: Set<any> = new Set([]);
  ListItemInput: string = "";

  constructor(private listService: ListsService, private route: ActivatedRoute, private router: Router) {
    let readListID = this.route.snapshot.paramMap.get("id");
    this.ListID = String(readListID);
    this.ListName = "";
  }

  ngOnInit(): void {
    const list = this.listService.getList(this.ListID)
    this.ListName = list.ListName;
    this.ListItems = new Set([...list.Items]);
    let objItems = list.Items.reduce((prev: any, cur: any) => {
      prev.push({ItemText: cur, toggle: false});
      return prev;
    }, []);
    this.Items = new Set([...objItems]);
  }

  addItem(event: any) {
    if(!this.ListItems.has(event.target.value)) {
      this.ListItems.add(event.target.value);
      this.Items.add({ ItemText: event.target.value, toggle: false });
      this.ListItemInput = "";
    }
  }

  toggleToRemove(listItem: any) {
    listItem.toggle = !listItem.toggle;  
  }

  save() {
    this.Items.forEach(element => {
      if (element.toggle) {
        this.ListItems.delete(element.ItemText);
      }
    });

    this.listService.patchList(this.ListID, { ListName: this.ListName, Items: [...this.ListItems] }).subscribe();
  }

  ngOnDestroy(): void {
    this.Items.forEach(element => {
      if (element.toggle) {
        this.ListItems.delete(element.ItemText);
      }
    });

    this.listService.patchList(this.ListID, { ListName: this.ListName, Items: [...this.ListItems] }).subscribe();
  }

}
