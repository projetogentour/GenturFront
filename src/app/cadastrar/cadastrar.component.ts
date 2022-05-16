import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  usuario: Usuario = new Usuario()
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuario cadastrado com sucesso!')
        this.router.navigate(['/entrar'])
      })
    } else {
      this.alertas.showAlertDanger('Senhas erradas')
    }
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
  validaNome() {

    if (this.usuario.nomeCompleto.length > 2) {
      let usuarioNome = ((<HTMLDivElement>document.querySelector('#nome')))
      usuarioNome.style.borderColor = 'green';
      usuarioNome.style.boxShadow = '0 0 1 em green';

    } else {
      let usuarioNome = ((<HTMLDivElement>document.querySelector('#nome')))
      usuarioNome.style.borderColor = 'red';
      usuarioNome.style.boxShadow = '0 0 1 em red';
    }
  }
}
