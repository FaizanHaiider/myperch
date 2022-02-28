import { Component, Input, OnInit } from '@angular/core';
import { List } from '@app/@shared/models/models';

@Component({
  selector: 'app-lists-card',
  template: `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5>Walmart</h5>
      </div>      
      
    </div>
  `,
  styleUrls: ['./lists-card.component.scss']
})
export class ListsCardComponent implements OnInit {

  @Input() list: any;
  // ListName: string = "Walmart";
  // Items: Set<string> = new Set(["chocolate cereal", "shampoo", "2% milk", "ps5 plz"]);

  constructor() { }

  ngOnInit(): void {
  }

}
