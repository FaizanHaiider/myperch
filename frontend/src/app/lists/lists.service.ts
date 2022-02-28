import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { List, ListService } from '@app/@shared/models/models';
import { map, Observable, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private lists: List[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getList(ListID: string): List {
    const index = this.lists.findIndex((cur) => cur.ListID == ListID);
    console.log(index);
    if(index == -1) {
      this.router.navigate(['/lists']);
    }
    return this.lists[index];
  }

  getListsQuery(ListName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.http.get('/api/lists?ListName='+ListName)
      .pipe(
        map((resultArr: any) => resultArr.map((result: any) => ListService.readList(result)))
      ).subscribe((value: List[]) => {
        subscriber.next(value);
        subscriber.complete();
        })
    });
  }

  getLocalLists(): List[] {
    return this.lists;
  }

  getLists(): Observable<List[]> {
    return new Observable((subscriber) => {
      this.http.get('/api/lists')
      .pipe(
        map((resultArr: any) => resultArr.map((result: any) => ListService.readList(result)))
      ).subscribe((value: List[]) => {
          subscriber.next(value);
          this.lists = value;
          subscriber.complete();
        })
    });
  }

  newList(): Observable<List> {
    return new Observable((subscriber) => {
      this.http.post('/api/lists', {})
        .pipe(
          map((resultArr: any) => (ListService.readList(resultArr)))
        ).subscribe((value: List) => {
          this.lists.push(value)
          subscriber.next(value);
          subscriber.complete();
        })
    });
  }

  patchList(ListID: string, data: any) {
    return new Observable((subscriber) => {
      const url: string = '/api/lists/' + ListID;
      this.http.patch(url, data)
      .subscribe((value) => {
        subscriber.complete();
      })
    });
  }

  deleteList(ListID: string) {
    const index = this.lists.findIndex((cur) => cur.ListID == ListID);
    this.lists.splice(index, 1);

    return new Observable((subscriber) => {
      const url: string = '/api/lists/' + ListID;
      this.http.delete(url)
        .subscribe((value) => {
          subscriber.complete();
        })
    })
  }
}
