import { Component, OnInit } from '@angular/core';
import { PostagemApi } from './postagem.model';
import { PostagemService } from './postagens.services';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pd-postagens',
  templateUrl: './postagens.component.html'
})
export class PostagensComponent implements OnInit {
  api: PostagemApi[];
  seatchControl: FormControl;
  searchForm: FormGroup;
  constructor(private postagemService: PostagemService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPost();
    this.seatchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      seatchControl: this.seatchControl
    })
    this.seatchControl.valueChanges
.pipe(
   debounceTime(500),
   distinctUntilChanged(),
   switchMap(seatchTerm =>
           this.postagemService.Postagens(seatchTerm)
            )
      ).subscribe(api => this.api = api)
  this.postagemService.Postagens().subscribe(api => this.api = api);

}


  getPost() {
    this.postagemService.getPosts().subscribe((api: PostagemApi[]) => {
      this.api = api;
    });
  }
}
