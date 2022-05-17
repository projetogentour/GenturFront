import { Produto } from "./Produto";

export class Usuario {
  public id: number;
  public nomeCompleto: string;
  public usuario: string;
  public foto: string;
  public senha: string;
  public tipo: string;
  public produto: Produto[];
}