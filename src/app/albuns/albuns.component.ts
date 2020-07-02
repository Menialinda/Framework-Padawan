import { Component, OnInit } from '@angular/core';
import { AlbunsService } from './albuns.services';
import { AlbumApi } from './albuns.model';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pd-albuns',
  templateUrl: './albuns.component.html'
})
export class AlbunsComponent implements OnInit {
  api: AlbumApi[];
  seatchControl: FormControl;
  searchForm: FormGroup;
  constructor(private albumsService: AlbunsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAlbum();
    this.seatchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      seatchControl: this.seatchControl
    })
    this.seatchControl.valueChanges
    .pipe(
      debounceTime(500), // manda o searchTerm apos 500s
      distinctUntilChanged(), // o valor tem que ser diferente um do outro para disparar o evento (eventos unicos)
      switchMap(seatchTerm =>
              this.albumsService.AlbumSear(seatchTerm)// troca a cadeia para observable de restaurante

              )
        ).subscribe(api => this.api = api)
    this.albumsService.AlbumSear().subscribe(api => this.api = api);
  }
  getAlbum() {
    this.albumsService.getAlbum().subscribe((api: AlbumApi[]) => {
      this.api = api;
    });
  }
}
