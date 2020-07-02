import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PostagemApi } from './postagem.model';


@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  url = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getPosts(): Observable<PostagemApi[]> {
    return this.httpClient.get<PostagemApi[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  Postagens(search?: string): Observable<PostagemApi[]>{
    let param:  HttpParams = undefined
    if (search) {
      param = new HttpParams().append('q', search)
    }
    return this.httpClient.get<PostagemApi[]>(this.url, {params: param});
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
