import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]


  constructor(
    private router: Router,
    private categoriaService: CategoriaService
  ) { }


  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar'])
    }
    this.findAllCategoria()
  }

  findAllCategoria(){
    this.categoriaService.getCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }


  cadastrarCategoria(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      alert('Categoria cadastrada')
      this.findAllCategoria()
      this.categoria = new Categoria()
    })
  }
}
