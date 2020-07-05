import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlbumApi } from '../albuns/albuns.model';
import { todoApi } from '../todos/todos.model';
import { PostagemApi } from '../postagens/postagem.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url de onde pegaremos o JSON para utilizar na aplicação
  albums = 'https://jsonplaceholder.typicode.com/albums';
  todo = 'https://jsonplaceholder.typicode.com/todos';
  posts = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { } //Precisamos do HttpClient para realizamos as requisições


  // Obtem a resposta da Api e também realiza pesquisa na mesma caso o search receba algo
  TodoSear(search?: string): Observable<todoApi[]>{
    let param:  HttpParams = undefined
    if (search) { //caso ele receber alguma coisa na variavel search, ele entrara neste bloco
      param = new HttpParams().append('q', search);
      //param recebe o parametro de pesquisa, o 'q' fala para o Json que queremos fazer uma busca em todos os dados
    }
    return this.httpClient.get<todoApi[]>(this.todo, {params: param});
    // this.httpClient.get<todoApi[]> -> Aponta para a Api para retornar os dados pro Observable
    //{params: param} r-> etornamos a url o parametro que vamos pesquisar
  }

   AlbumSear(search?: string): Observable<AlbumApi[]>{
    let param:  HttpParams = undefined
    if (search) {
      param = new HttpParams().append('q', search);
    }
    return this.httpClient.get<AlbumApi[]>(this.albums, {params: param});
  }

  Postagens(search?: string): Observable<PostagemApi[]>{
    let param:  HttpParams = undefined
    if (search) {
      param = new HttpParams().append('q', search)
    }
    return this.httpClient.get<PostagemApi[]>(this.posts, {params: param});
  }
}
