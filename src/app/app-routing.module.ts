import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { EntrarComponent } from './entrar/entrar.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  { path:'', redirectTo:'inicio', pathMatch:'full'},

  { path:'inicio', component: PaginaInicialComponent },
  { path:'contato', component: ContatoComponent },
  { path:'entrar', component: EntrarComponent },
  { path:'cadastrar', component: CadastrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
