import { Component, OnInit } from '@angular/core';
import { PostagemApi } from './postagem.model';
import { ApiService } from '../service/api.services';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pd-postagens',
  templateUrl: './postagens.component.html'
})
export class PostagensComponent implements OnInit {
  api: PostagemApi[]; //api e um vetor de objeto da interface PostagemApi
  seatchControl: FormControl; //serve para ouvirmos os valores que serão digitados
  searchForm: FormGroup; //Serve para criarmos um grupo de formulario
  constructor(private postagemService: ApiService, private fb: FormBuilder) { }
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
           this.postagemService.Postagens(seatchTerm) // troca a cadeia para observable de PostagemApi
            )
      ).subscribe(api => this.api = api) // subscribe(api => this.api = api) -> Retorna os dados da api

  //Retornamos ao nosso html o que recebemos da Api
  this.postagemService.Postagens().subscribe(api => this.api = api);

}



}
