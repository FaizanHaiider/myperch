import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ListsComponent } from './lists.component';


const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/lists', pathMatch: 'full' },
    { path: 'lists', component: ListsComponent, data: { title: marker('Lists') } },
    { path: 'lists/:id', component: ListDetailsComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
