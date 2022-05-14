import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {


  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Voce precisa estar logado para ficar aqui...')
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario()
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  atualizar() {

    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        alert('Usuario atualizado com sucesso!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    } else {
      alert('Senhas erradas')
    }
  }

  findByIdUsuario() {
    this.auth.findByIdUsuario().subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  validaEmail() {
    let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/

    if (this.usuario.usuario.match(regex)) {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';
    }
    else {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }
  }

  apagar(){
    this.auth.deleteUsuario(this.idUsuario).subscribe(()=>{
      alert('Usuario apagado com sucesso!')
      this.router.navigate(['/entrar'])
      environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
    })
  }

}
