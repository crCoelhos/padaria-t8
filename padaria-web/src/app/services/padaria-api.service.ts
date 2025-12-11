import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  tipoUsuario?: string;
}

export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
}

export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
  preco: number;
  categoria: { id: number; nome?: string; descricao?: string };
  imagens?: string[];
}

export interface Endereco {
  id?: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}

export interface PedidoItem {
  produtoId: number;
  quantidade: number;
}

export interface Pedido {
  id?: number;
  usuarioId: number;
  itens: PedidoItem[];
  statusPedido?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PadariaApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

}
