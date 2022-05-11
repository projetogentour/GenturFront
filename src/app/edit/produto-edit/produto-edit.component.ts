import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {


  produto: Produto = new Produto()
  categoria: Categoria = new Categoria()
  idCategoria: number
  listaCategoria: Categoria[]
  produtoService: any;
  categoriaService: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()
    let id = this.route.snapshot.params['id']
    this.getByIdProduto(id)
    this.getCategoria()
    this.findByIdCategoria()
  }

  getByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getCategoria() {
    this.categoriaService.getCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  atualizar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
