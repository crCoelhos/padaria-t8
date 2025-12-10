import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService, Pedido, PedidoItem } from '../../services/padaria-api.service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  pedidoId?: number;
  pedidoEncontrado?: Pedido;

  novoPedido: Pedido = { usuarioId: 1, itens: [] };
  novoItem: PedidoItem = { produtoId: 1, quantidade: 1 };

  statusPedido = 'EM_PREPARO';

  constructor(private api: PadariaApiService) {}

  buscarPorId() {
    if (!this.pedidoId) { this.pedidoEncontrado = undefined; return; }
    this.api.getPedido(this.pedidoId).subscribe(res => this.pedidoEncontrado = res);
  }

  adicionarItem() {
    this.novoPedido.itens.push({ ...this.novoItem });
    this.novoItem = { produtoId: 1, quantidade: 1 };
  }

  criarPedido() {
    this.api.criarPedido(this.novoPedido).subscribe(res => {
      this.pedidoEncontrado = res;
      this.novoPedido = { usuarioId: 1, itens: [] };
    });
  }

  atualizarStatus() {
    if (!this.pedidoId) return;
    this.api.atualizarStatusPedido(this.pedidoId, this.statusPedido).subscribe(() => this.buscarPorId());
  }
}
