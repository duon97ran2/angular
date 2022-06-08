import { CanAccessAdminGuard } from './guards/can-access-admin.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { ProductCreateComponent } from './admin/products/product-create/product-create.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatgoryFormComponent } from './admin/category/catgory-form/catgory-form.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [CanAccessAdminGuard],
    children: [
      {
        path: "products",
        children: [
          {
            path: "list",
            component: ProductListComponent
          },
          {
            path: "form",
            component: ProductCreateComponent
          },
          {
            path: "form/:id",
            component: ProductCreateComponent
          },
          {
            path: "detail/:id",
            component: ProductDetailComponent
          },
        ]
        ,
      },
      {
        path: "category",
        children: [
          {
            path: "list",
            component: CategoryListComponent
          },
          {
            path: "form",
            component: CatgoryFormComponent
          },
          {
            path: "form/:id",
            component: CatgoryFormComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanAccessAdminGuard]
})
export class AppRoutingModule { }
