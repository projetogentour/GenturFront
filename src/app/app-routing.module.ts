import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContatoComponent } from './contato/contato.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';


const routes: Routes = [
  { path:'', redirectTo:'inicio', pathMatch:'full'},

  { path:'inicio', component: PaginaInicialComponent },
  { path:'contato', component: ContatoComponent },
  { path:'entrar', component: EntrarComponent },
  { path:'cadastrar', component: CadastrarComponent },
  { path:'carrinho', component: CarrinhoComponent },

  { path:'categoria', component: CategoriaComponent },

  { path:'usuario-edit/:id', component: UsuarioEditComponent },
  { path:'produto-edit/:id', component: ProdutoEditComponent },

  { path:'categoria-edit/:id', component: CategoriaEditComponent },
  { path:'categoria-delete/:id', component: CategoriaDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
