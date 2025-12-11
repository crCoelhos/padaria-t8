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

  constructor(private http: HttpClient) {}

  // Usuarios
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/buscar/${id}`);
  }

  buscarUsuarios(termoBusca: string): Observable<Usuario[]> {
    const params = new HttpParams().set('termoBusca', termoBusca);
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/buscar`, { params });
  }

  inserirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/inserir`, usuario);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/atualizar/${id}`, { ...usuario, id });
  }

  removerUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/remover/${id}`);
  }

  // Categorias
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/categorias/buscar/${id}`);
  }

  buscarCategorias(termoBusca: string): Observable<Categoria[]> {
    const params = new HttpParams().set('termoBusca', termoBusca);
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias/buscar`, { params });
  }

  inserirCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categorias/inserir`, categoria);
  }

  atualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrl}/categorias/atualizar`, categoria);
  }

  removerCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categorias/remover/${id}`);
  }

  // Produtos
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/produtos/${id}`);
  }

  buscarProdutos(termoBusca: string): Observable<Produto[]> {
    const params = new HttpParams().set('termoBusca', termoBusca);
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`, { params });
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);
  }

  inserirProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseUrl}/produtos`, produto);
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/produtos`, produto);
  }

  removerProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/produtos/${id}`);
  }

  adicionarImagensProduto(id: number, files: File[], publica: boolean): Observable<any> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('publica', String(publica));
    return this.http.post(`${this.baseUrl}/produtos/${id}/imagem`, formData);
  }

  removerImagemProduto(id: number, nomeArquivo: string): Observable<void> {
    const params = new HttpParams().set('nomeArquivo', nomeArquivo);
    return this.http.delete<void>(`${this.baseUrl}/produtos/${id}/imagem`, { params });
  }

  // Endereços
  listarEnderecosPorUsuario(usuarioId: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseUrl}/enderecos/usuario/${usuarioId}`);
  }

  adicionarEnderecoParaUsuario(usuarioId: number, endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.baseUrl}/enderecos/usuario/${usuarioId}`, endereco);
  }

  removerEndereco(enderecoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/enderecos/${enderecoId}`);
  }

  // Pedidos
  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/pedidos/${id}`);
  }

  criarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/pedidos`, pedido);
  }

  atualizarStatusPedido(id: number, statusPedido: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/pedidos/${id}/status`, { statusPedido });
  }

  // Entrega
  agendarEntregaParaPedido(pedidoId: number, dados: { codigoConfirmacao: number; previsaoEntrega: string; retirada: boolean; endereco: { id: number } }): Observable<any> {
    return this.http.post(`${this.baseUrl}/entrega/pedido/${pedidoId}`, dados);
  }

  finalizarEntrega(entregaId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/entrega/${entregaId}/finalizar`, {});
  }
}
