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
  foto = environment.foto

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
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    // if (environment.token == '') {
    //   alert('Voce precisa estar logado para ficar aqui...')
    //   this.router.navigate(['/entrar'])
    // }
    this.auth.refreshToken()
    this.getProduto()
    this.getCategoria()
    this.findByIdUsuario()
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

  getProduto() {
    this.produtoService.getProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })
  }

  findByIdUsuario() {
    this.auth.findByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
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

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }
  
}
