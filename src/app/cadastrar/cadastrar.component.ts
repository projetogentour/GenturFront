import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
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
  // email: = document.querySelector('#email');

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  // validaEmail() {
  //     if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
  //       email.style.borderBottom = '3px solid var(--dark-red)';
  //       email.style.color = 'var(--dark-red)';
  //     }
  //   }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        alert('Usuario cadastrado com sucesso!')
        this.router.navigate(['/entrar'])
      })
    } else {
      alert('Senhas erradas')
    }
  }

  validaEmail() {
    let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/

    if(this.usuario.usuario.match(regex)) {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';
    }
    else{
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }
  }
}