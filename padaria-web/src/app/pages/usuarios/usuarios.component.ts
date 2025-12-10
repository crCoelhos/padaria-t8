import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService, Usuario } from '../../services/padaria-api.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  termoBusca = '';
  usuarios: Usuario[] = [];

  usuarioId?: number;
  usuarioEncontrado?: Usuario;

  novoUsuario: Usuario = { nome: '', email: '', senha: '', telefone: '', tipoUsuario: 'CLIENTE' };
  editarUsuarioId?: number;
  usuarioEdicao: Usuario = { nome: '', email: '', senha: '', telefone: '', tipoUsuario: 'CLIENTE' };

  constructor(private api: PadariaApiService) {}

  buscar() {
    if (!this.termoBusca) { this.usuarios = []; return; }
    this.api.buscarUsuarios(this.termoBusca).subscribe(res => this.usuarios = res);
  }

  buscarPorId() {
    if (!this.usuarioId) { this.usuarioEncontrado = undefined; return; }
    this.api.getUsuarioById(this.usuarioId).subscribe(res => this.usuarioEncontrado = res);
  }

  inserir() {
    this.api.inserirUsuario(this.novoUsuario).subscribe(res => {
      this.novoUsuario = { nome: '', email: '', senha: '', telefone: '', tipoUsuario: 'CLIENTE' };
      this.usuarios.push(res);
    });
  }

  prepararEdicao(u: Usuario) {
    this.editarUsuarioId = u.id;
    this.usuarioEdicao = { ...u };
  }

  atualizar() {
    if (!this.editarUsuarioId) return;
    this.api.atualizarUsuario(this.editarUsuarioId, this.usuarioEdicao).subscribe(res => {
      const idx = this.usuarios.findIndex(x => x.id === res.id);
      if (idx >= 0) this.usuarios[idx] = res;
      this.editarUsuarioId = undefined;
    });
  }

  remover(id?: number) {
    if (!id) return;
    this.api.removerUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      if (this.usuarioEncontrado?.id === id) this.usuarioEncontrado = undefined;
    });
  }
}
