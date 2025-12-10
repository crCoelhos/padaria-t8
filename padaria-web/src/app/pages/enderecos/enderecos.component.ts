import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService, Endereco } from '../../services/padaria-api.service';

@Component({
  selector: 'app-enderecos',
  imports: [CommonModule, FormsModule],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.css'
})
export class EnderecosComponent {
  usuarioIdList?: number;
  enderecos: Endereco[] = [];

  usuarioIdNovo?: number;
  novoEndereco: Endereco = { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '' };

  enderecoIdRemover?: number;

  constructor(private api: PadariaApiService) {}

  listar() {
    if (!this.usuarioIdList) { this.enderecos = []; return; }
    this.api.listarEnderecosPorUsuario(this.usuarioIdList).subscribe(res => this.enderecos = res);
  }

  adicionar() {
    if (!this.usuarioIdNovo) return;
    this.api.adicionarEnderecoParaUsuario(this.usuarioIdNovo, this.novoEndereco).subscribe(res => {
      this.novoEndereco = { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '' };
      if (this.usuarioIdList === this.usuarioIdNovo) this.enderecos.push(res);
    });
  }

  remover() {
    if (!this.enderecoIdRemover) return;
    this.api.removerEndereco(this.enderecoIdRemover).subscribe(() => {
      this.enderecos = this.enderecos.filter(e => e.id !== this.enderecoIdRemover);
      this.enderecoIdRemover = undefined;
    });
  }
}
