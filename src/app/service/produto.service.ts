import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient,
    ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>('https://gentur-api.herokuapp.com/produto')
  }

  findByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`https://gentur-api.herokuapp.com/produto/${id}`)
  }

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('https://gentur-api.herokuapp.com/produto', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>('https://gentur-api.herokuapp.com/produto', produto, this.token)
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://gentur-api.herokuapp.com/produto/${id}`, this.token)
  }
}
