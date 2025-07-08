import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    children: [{ path: ':id', component: ProductDescriptionComponent }],
  },
  {
    path: 'cart',
    component: ProductsComponent,
  },
  { path: '**', component: NotFoundComponent },
];
