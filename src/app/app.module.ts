import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ContatoComponent } from './contato/contato.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ContatoComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    ProdutoEditComponent,
    UsuarioEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
