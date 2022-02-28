import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { ListsCardComponent } from '@shared/base-components/lists-card/lists-card.component';
import { ListsRoutingModule } from './lists-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListDetailsComponent } from './list-details/list-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListsComponent,
    ListsCardComponent,
    ListDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ListsRoutingModule
  ]
})
export class ListsModule { }
