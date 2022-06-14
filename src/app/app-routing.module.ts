import { OrderDetailComponent } from './admin/orders/order-detail/order-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ProductPageComponent } from './client/product-page/product-page.component';
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
import { FormUserComponent } from './admin/users/form-user/form-user.component';
import { ListUserComponent } from './admin/users/list-user/list-user.component';
import { OrderListComponent } from './admin/orders/order-list/order-list.component';

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: 'full'
      },
      {
        path: "home",
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
          },
          {
            path: "",
            component: ProductPageComponent
          },
        ]
      },
      {
        path: "category/:id",
        component: ProductPageComponent
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ]
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
        path: 'users',
        children: [
          {
            path: "list",
            component: ListUserComponent
          },
          {
            path: "form",
            component: FormUserComponent
          },
          {
            path: "form/:id",
            component: FormUserComponent
          },
        ]
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
      },
      {
        path: "orders",
        children: [
          {
            path: "list",
            component: OrderListComponent,

          },
          {
            path: "cancel",
            component: OrderListComponent,
          },
          {
            path: "detail/:id",
            component: OrderDetailComponent,
          },

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule],
  providers: [CanAccessAdminGuard]
})
export class AppRoutingModule { }
