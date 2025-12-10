import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PadariaApiService } from '../../services/padaria-api.service';

@Component({
  selector: 'app-entrega',
  imports: [CommonModule, FormsModule],
  templateUrl: './entrega.component.html',
  styleUrl: './entrega.component.css'
})
export class EntregaComponent {
  pedidoId?: number;
  dadosAgendamento = {
    codigoConfirmacao: 123456,
    previsaoEntrega: new Date().toISOString(),
    retirada: false,
    endereco: { id: 1 }
  };

  entregaIdFinalizar?: number;
  resultado?: any;

  constructor(private api: PadariaApiService) {}

  agendar() {
    if (!this.pedidoId) return;
    this.api.agendarEntregaParaPedido(this.pedidoId, this.dadosAgendamento).subscribe(res => this.resultado = res);
  }

  finalizar() {
    if (!this.entregaIdFinalizar) return;
    this.api.finalizarEntrega(this.entregaIdFinalizar).subscribe(res => this.resultado = res);
  }
}
