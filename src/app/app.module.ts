import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostagensComponent } from './postagens/postagens.component';
import { AlbunsComponent } from './albuns/albuns.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    PostagensComponent,
    AlbunsComponent,
    TodosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
             ReactiveFormsModule,
             BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
