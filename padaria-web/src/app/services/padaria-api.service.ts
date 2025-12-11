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

export interface Categoria { id: number; nome?: string; descricao?: string };

export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
  preco: number;
  categoria: Categoria
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
  private baseUrl = "api"

  constructor(private http: HttpClient) { }



  buscarProdutos(termoBusca: string): Observable<Produto> {
    const params = new HttpParams().set('termoBusca', termoBusca);
    return this.http.get<Produto>(`${this.baseUrl}/produtos`, { params })
  }

  getProdutosById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/produtos/${id}}`)
  }

  inserirProdutos(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseUrl}/produtos`, produto)
  }

  removerProduto(produto: Produto): Observable<Produto> {
    return this.http.delete<Produto>(`${this.baseUrl}/produtos/${produto}}`)
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/produtos`, produto)
  }




}
