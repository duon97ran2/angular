import { CartComponent } from './client/cart/cart.component';
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
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailPageComponent } from './client/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "products",
        children: [
          {
            path: "detail/:id",
            component: DetailPageComponent
          }
        ]
      },
    ]
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
