import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { environment } from "src/environments/environment.prod"
import { Categoria } from "../model/Categoria"
import { Produto } from "../model/Produto"
import { Usuario } from "../model/Usuario"
import { AuthService } from "../service/auth.service"
import { CategoriaService } from "../service/categoria.service"
import { ProdutoService } from "../service/produto.service"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  id = environment.id

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
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    // if (environment.token == '') {
    //   alert('Voce precisa estar logado para ficar aqui...')
    //   this.router.navigate(['/entrar'])
    // }
    let id = this.route.snapshot.params['id']

    this.produtoService.refreshToken()
    this.auth.refreshToken()
    this.categoriaService.refreshToken()
    // this.findByIdProduto(id)
    this.getProduto()
    this.getCategoria()
    // this.findByIdUsuario()
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
    })
  }

  publicar() {
    this.produtoService.refreshToken()
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.auth.idUsuario
    this.produto.usuario = this.usuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto realizada com sucesso!')
      this.produto = new Produto()
      this.getProduto()
    })
  }

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

}
