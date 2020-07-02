import { Component, OnInit } from '@angular/core';
import { todoApi } from './todos.model';
import { TodoService } from './todos.services';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pd-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  api: todoApi[];
  seatchControl: FormControl;
  searchForm: FormGroup;
  constructor(private todoService: TodoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTodo();

    this.seatchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      seatchControl: this.seatchControl
    })
    this.seatchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(seatchTerm =>
              this.todoService.TodoSear(seatchTerm)
              )
        ).subscribe(api => this.api = api)
    this.todoService.TodoSear().subscribe(api => this.api = api);
  }

    getTodo() {
      this.todoService.getTodo().subscribe((api: todoApi[]) => {
        this.api = api;
      });
    }
}
