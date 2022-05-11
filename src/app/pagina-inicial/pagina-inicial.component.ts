import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
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
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()
    this.getProduto()
    this.getCategoria()
    this.getByIdProduto(this.produto.id)


  }

  getCategoria() {
    this.categoriaService.getCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getProduto(){
    this.produtoService.getProduto().subscribe((resp: Produto[])=>{
      this.listaProduto = resp
    })
  }

  findByIdUsuario(){
    this.auth.findByIdUsuario(this.idUsuario).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }
  getByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  publicar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto realizada com sucesso!')
      this.produto = new Produto()
      this.getProduto()
    })
  }
}