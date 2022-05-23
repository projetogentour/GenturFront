import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  listaProduto: Produto[]
  produto: Produto = new Produto()

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id


  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private carrinho: CarrinhoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    let id = this.route.snapshot.params['id']
    this.getProduto()
    this.getCategoria()

    this.produtoService.refreshToken()
    this.auth.refreshToken()
    this.categoriaService.refreshToken()
  }

  getCategoria() {
    this.categoriaService.getCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.findByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getProduto() {
    this.produtoService.getProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })
  }

  findByIdUsuario() {
    this.auth.findByIdUsuario().subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }
  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
      this.addProduto()
    })
  }

  addProduto(){
    this.carrinho.adicionar(this.produto)
    console.log(this.carrinho.produto)
  }

  scroll(){
    // window.scroll(0,0);

   window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
  }
}