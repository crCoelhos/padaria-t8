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

  constructor(private api: PadariaApiService) { }


}
