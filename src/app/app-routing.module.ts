import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { AlbunsComponent } from './albuns/albuns.component';
import { PostagensComponent } from './postagens/postagens.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Aqui e onde ficam as rotas de todo o site, onde cada uma liga com um componente
// Path -> Caminho para acessar um componente, este caminho se referencia a parte da URL
// component  -> Componente que sera acessado por aquela rota, para isto devemos importa-los, como e visto nos imports acima
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todos', component: TodosComponent},
  {path: 'albuns', component: AlbunsComponent},
  {path: 'posts', component: PostagensComponent},
  {path: '**', component: NotFoundComponent} // path: '**' -> Serve para o roteador selecionar essa rota se a URL que foi solicitada não corresponder a nenhuma rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
