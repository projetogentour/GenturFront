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

  validaEmailCad() {
    let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/
    if (this.usuario.usuario.match(regex)) {
      let usuarioCad = (<HTMLDivElement>document.querySelector('#usuarioCad'))
      usuarioCad.style.borderColor = 'green';
      usuarioCad.style.boxShadow = '0 0 1em green';
    }
    else {
      let usuarioCad = (<HTMLDivElement>document.querySelector('#usuarioCad'))
      usuarioCad.style.borderColor = 'red';
      usuarioCad.style.boxShadow = '0 0 1em red';
    }
  }

  validaNomeCad(){
    let nomeCad = this.usuario.nomeCompleto
    let usuarioNomeCad = (<HTMLDivElement>document.getElementById('nomeCad'))
    if (this.usuario.nomeCompleto.length > 2) {
      usuarioNomeCad.style.borderColor = 'green';
      usuarioNomeCad.style.boxShadow = '0 0 1em green';

    } else {
      usuarioNomeCad.style.borderColor = 'red';
      usuarioNomeCad.style.boxShadow = '0 0 1em red';
    }
  }
}
