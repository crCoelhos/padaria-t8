import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService, Produto, Categoria } from '../../services/padaria-api.service';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  termoBusca = '';
  produtos: Produto[] = [];
  produtoId?: number;
  produtoEncontrado?: Produto;

  novoProduto: Produto = { nome: '', descricao: '', ativo: true, preco: 0, categoria: { id: 1 } };
  produtoEdicao: Produto = { id: 0, nome: '', descricao: '', ativo: true, preco: 0, categoria: { id: 1 } };
  editarProduto = false;

  selectedFiles: File[] = [];
  publica = true;
  nomeArquivoRemover = '';

  constructor(private api: PadariaApiService) {}

  buscar() {
    if (!this.termoBusca) { this.produtos = []; return; }
    this.api.buscarProdutos(this.termoBusca).subscribe(res => this.produtos = res);
  }

  buscarPorId() {
    if (!this.produtoId) { this.produtoEncontrado = undefined; return; }
    this.api.getProdutoById(this.produtoId).subscribe(res => this.produtoEncontrado = res);
  }

  inserir() {
    this.api.inserirProduto(this.novoProduto).subscribe(res => {
      this.novoProduto = { nome: '', descricao: '', ativo: true, preco: 0, categoria: { id: 1 } };
      this.produtos.push(res);
    });
  }

  prepararEdicao(p: Produto) {
    this.produtoEdicao = { ...p };
    this.editarProduto = true;
  }

  atualizar() {
    this.api.atualizarProduto(this.produtoEdicao).subscribe(res => {
      const idx = this.produtos.findIndex(x => x.id === res.id);
      if (idx >= 0) this.produtos[idx] = res;
      this.editarProduto = false;
    });
  }

  remover(id?: number) {
    if (!id) return;
    this.api.removerProduto(id).subscribe(() => {
      this.produtos = this.produtos.filter(p => p.id !== id);
      if (this.produtoEncontrado?.id === id) this.produtoEncontrado = undefined;
    });
  }

  selecionarArquivos(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = Array.from(input.files ?? []);
  }

  uploadImagens() {
    if (!this.produtoId || this.selectedFiles.length === 0) return;
    this.api.adicionarImagensProduto(this.produtoId, this.selectedFiles, this.publica).subscribe(() => {
      this.selectedFiles = [];
    });
  }

  removerImagem() {
    if (!this.produtoId || !this.nomeArquivoRemover) return;
    this.api.removerImagemProduto(this.produtoId, this.nomeArquivoRemover).subscribe(() => {
      this.nomeArquivoRemover = '';
    });
  }
}
