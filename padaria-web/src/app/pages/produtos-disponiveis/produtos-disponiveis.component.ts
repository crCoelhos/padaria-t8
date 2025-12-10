import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PadariaApiService, Produto } from '../../services/padaria-api.service';

@Component({
  selector: 'app-produtos-disponiveis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos-disponiveis.component.html',
  styleUrl: './produtos-disponiveis.component.css'
})
export class ProdutosDisponiveisComponent implements OnInit {
  produtos: Produto[] = [];
  carregando = false;

  constructor(private api: PadariaApiService) {}

  ngOnInit() {
    this.carregando = true;
    this.api.listarProdutos().subscribe({
      next: (res) => { this.produtos = res; },
      error: () => { this.produtos = []; this.carregando = false; },
      complete: () => { this.carregando = false; }
    });
  }
}
