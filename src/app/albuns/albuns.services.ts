import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlbumApi } from './albuns.model';

@Injectable({
  providedIn: 'root'
})
export class AlbunsService {

  url = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getAlbum(): Observable<AlbumApi[]> {
    return this.httpClient.get<AlbumApi[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  AlbumSear(search?: string): Observable<AlbumApi[]>{
    let param:  HttpParams = undefined
    if (search) {
      param = new HttpParams().append('q', search);
    }
    return this.httpClient.get<AlbumApi[]>(this.url, {params: param});
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
