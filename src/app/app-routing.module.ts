import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { ProductCreateComponent } from './admin/products/product-create/product-create.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "products",
        children: [
          {
            path: "list",
            component: ProductListComponent
          },
          {
            path: "create",
            component: ProductCreateComponent
          },
          {
            path: "create/:id",
            component: ProductCreateComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
