import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { todoApi } from './todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'https://jsonplaceholder.typicode.com/todos';


  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem a resposta da Api
  getTodo(): Observable<todoApi[]> {
    return this.httpClient.get<todoApi[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  TodoSear(search?: string): Observable<todoApi[]>{
    let param:  HttpParams = undefined
    if (search) {
      param = new HttpParams().append('q', search);
    }
    return this.httpClient.get<todoApi[]>(this.url, {params: param});
  }

  // Manipulação dos erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
