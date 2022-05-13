import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';


const routes: Routes = [
  { path:'', redirectTo:'entrar', pathMatch:'full'},

  { path:'inicio', component: PaginaInicialComponent },
  { path:'contato', component: ContatoComponent },
  { path:'entrar', component: EntrarComponent },
  { path:'cadastrar', component: CadastrarComponent },

  { path:'usuario-edit/:id', component: UsuarioEditComponent },
  { path:'produto-edit/:id', component: ProdutoEditComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
