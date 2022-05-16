import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('https://gentur-api.herokuapp.com/categoria')
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('https://gentur-api.herokuapp.com/categoria', categoria, this.token)
  }

  findByIdCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`https://gentur-api.herokuapp.com/categoria/${id}`)
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>('https://gentur-api.herokuapp.com/categoria', categoria, this.token)
  }
  deleteCategoria(id: number) {
    return this.http.delete(`https://gentur-api.herokuapp.com/categoria/${id}`, this.token)
  }

}
