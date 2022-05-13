import { TemplateLiteral } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css'],
})
export class CategoriaEditComponent implements OnInit {

  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      // alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar']);
    }
    this.categoriaService.refreshToken()
    let id = this.route.snapshot.params['id'];
    this.findByIdCategoria(id);
  }

  findByIdCategoria(id: number) {
    this.categoriaService.findByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;
    });
  }

  atualizar() {
    this.categoriaService
      .putCategoria(this.categoria)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;
        alert('Categoria modificada com sucesso!!!');
        this.router.navigate(['/categoria'])
      });
  }
}
