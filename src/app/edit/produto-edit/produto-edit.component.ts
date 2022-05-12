import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
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
  idProduto: number



  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()
    let id = this.route.snapshot.params['id']
    this.findByIdProduto(id)
    this.getCategoria()
    this.findByIdCategoria()
  }

  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.findByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
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

  apagar(){
    this.produtoService.deleteProduto(this.produto.id).subscribe(()=>{
      alert('Produto apagado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
