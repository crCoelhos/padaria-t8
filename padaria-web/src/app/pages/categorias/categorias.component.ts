import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService, Categoria } from '../../services/padaria-api.service';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  termoBusca = '';
  categorias: Categoria[] = [];

  categoriaId?: number;
  categoriaEncontrada?: Categoria;

  novaCategoria: Categoria = { nome: '', descricao: '' };
  categoriaEdicao: Categoria = { id: 0, nome: '', descricao: '' };
  editarCategoria = false;

  constructor(private api: PadariaApiService) {}

  buscar() {
    if (!this.termoBusca) { this.categorias = []; return; }
    this.api.buscarCategorias(this.termoBusca).subscribe(res => this.categorias = res);
  }

  buscarPorId() {
    if (!this.categoriaId) { this.categoriaEncontrada = undefined; return; }
    this.api.getCategoriaById(this.categoriaId).subscribe(res => this.categoriaEncontrada = res);
  }

  inserir() {
    this.api.inserirCategoria(this.novaCategoria).subscribe(res => {
      this.novaCategoria = { nome: '', descricao: '' };
      this.categorias.push(res);
    });
  }

  prepararEdicao(cat: Categoria) {
    this.categoriaEdicao = { ...cat };
    this.editarCategoria = true;
  }

  atualizar() {
    this.api.atualizarCategoria(this.categoriaEdicao).subscribe(res => {
      const idx = this.categorias.findIndex(x => x.id === res.id);
      if (idx >= 0) this.categorias[idx] = res;
      this.editarCategoria = false;
    });
  }

  remover(id?: number) {
    if (!id) return;
    this.api.removerCategoria(id).subscribe(() => {
      this.categorias = this.categorias.filter(c => c.id !== id);
      if (this.categoriaEncontrada?.id === id) this.categoriaEncontrada = undefined;
    });
  }
}
