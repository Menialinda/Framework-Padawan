import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.services';
import { AlbumApi } from './albuns.model';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pd-albuns',
  templateUrl: './albuns.component.html'
})
export class AlbunsComponent implements OnInit {
  api: AlbumApi[]; //api e um vetor de objeto da interface AlbumApi
  seatchControl: FormControl; //serve para ouvirmos os valores que serão digitados
  searchForm: FormGroup; //Serve para criarmos um grupo de formulario
  constructor(private albumsService: ApiService, private fb: FormBuilder) { }
  //No construtor, informamos que precisamos de um Serviço e do FormBuilder para criação de formularios

  ngOnInit(): void {
    this.seatchControl = this.fb.control(''); // Criamos um controle de formulario
    this.searchForm = this.fb.group({ // Criamos um grupo de formulario
      seatchControl: this.seatchControl
    })

    this.seatchControl.valueChanges //Emite um evento cada vez que muda o valor
    .pipe(
      debounceTime(500), // manda o searchTerm apos 500s
      distinctUntilChanged(), // o valor tem que ser diferente um do outro para disparar o evento (eventos unicos)
      switchMap(seatchTerm =>
              this.albumsService.AlbumSear(seatchTerm)// troca a cadeia para observable de AlbumApi
              )
        ).subscribe(api => this.api = api) // subscribe(api => this.api = api) -> Retorna os dados da api

    //Retornamos ao nosso html o que recebemos da Api
    this.albumsService.AlbumSear().subscribe(api => this.api = api);
  }

}
