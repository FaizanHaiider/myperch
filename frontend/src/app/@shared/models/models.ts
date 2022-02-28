export interface List {
  ListID: string;
  ListName: string;
  Items: string[];
}

export class ListService {

  static readList(list: List): List {
    return { ListID: list.ListID, ListName: list.ListName, Items: list.Items };
  }
}