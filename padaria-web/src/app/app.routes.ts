import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { EnderecosComponent } from './pages/enderecos/enderecos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EntregaComponent } from './pages/entrega/entrega.component';
import { ProdutosDisponiveisComponent } from './pages/produtos-disponiveis/produtos-disponiveis.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'disponiveis', component: ProdutosDisponiveisComponent },
  { path: 'enderecos', component: EnderecosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'entrega', component: EntregaComponent },
  { path: '**', redirectTo: 'usuarios' }
];
