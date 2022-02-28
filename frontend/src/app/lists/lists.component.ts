import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List, ListService } from '@app/@shared/models/models';
import { ListsService } from './lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[] = []
  constructor(private listService: ListsService, private router: Router) { }

  ngOnInit(): void {
    this.listService.getLists()
    .subscribe((value: List[]) => {
      this.lists = value;
    })
  }

  routeTo(listID: string) {
    this.router.navigate(['lists', listID]);
  }

  removeList(listID: string) {
    this.listService.deleteList(listID)
    .subscribe((value) => {});
  }

  newList() {
    this.listService.newList()
    .subscribe((value: List) => {
      this.router.navigate(['lists', value.ListID])
    });
  }

  search(event: any) {
    if(event.target.value.length > 0) {
      this.listService.getListsQuery(event.target.value).subscribe((value) => {
        console.log(value);
        this.lists = value
      });
    } else {
      this.lists = this.listService.getLocalLists();
    }
    
  }

}
