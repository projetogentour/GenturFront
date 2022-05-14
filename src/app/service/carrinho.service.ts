import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produto: Produto[] = []
  totalItens: number

  constructor() { }

  adicionar(produto: Produto){
    this.produto.push(produto)
    this.totalItens = this.produto.length
  }

  listar(){
    return this.produto
  }

  limpar(){
    this.produto = [];
    return this.produto
  }

}
