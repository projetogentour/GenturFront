import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private http: HttpClient ) { }

  idUsuario: number


  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('http://localhost:8080/usuarios/atualizar', usuario, this.token)
  }
  deleteUsuario(id: number){
    return this.http.delete(`http://localhost:8080/usuarios/${id}`, this.token)
  }

  findByIdUsuario(): Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuarios/${this.idUsuario}`, this.token)
  }

  logado(){
    let ok: boolean = false;

    if(environment.token != ""){
      ok = true
    }
    return ok
  }
}
