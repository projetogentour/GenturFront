import { Produto } from "./Produto";

export class Usuario {
  public id: number;
  public nomeCompleto: string;
  public usuario: string;
  public foto: string;
  public senha: string;
  public tipo: string;
  public telefone: string;
  public identidade: string;
  public cep: string;
  public nCasa: string;
  public refCasa: string;
  public validadeCarao: string;
  public cvv: string;
  public produto: Produto[];
}