import { Produto } from "./Produto";

export class Usuario {
  public id: number;
  public nome: string;
  public emailUsuario: string;
  public foto: string;
  public senha: string;
  public tipo: string;
  public dadosPessoais: string;
  public dadosPagamento: string;
  public produto: Produto[];
}