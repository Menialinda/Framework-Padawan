import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { AlbunsComponent } from './albuns/albuns.component';
import { PostagensComponent } from './postagens/postagens.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todos', component: TodosComponent},
  {path: 'albuns', component: AlbunsComponent},
  {path: 'posts', component: PostagensComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
