import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableAvatarComponent } from './table/table-avatar/table-avatar.component';
import { TypographyComponent } from './typography/typography.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ShowValidateComponent } from './components/show-validate/show-validate.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ProductCreateComponent } from './admin/products/product-create/product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ToastrModule } from 'ngx-toastr';
import { CatgoryFormComponent } from './admin/category/catgory-form/catgory-form.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductPanelComponent } from './components/product-panel/product-panel.component';
import { CartComponent } from './client/cart/cart.component';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { DetailPageComponent } from './client/detail-page/detail-page.component';
import { ProductPageComponent } from './client/product-page/product-page.component';
import { StatusChangeComponent } from './components/status-change/status-change.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ListUserComponent } from './admin/users/list-user/list-user.component';
import { FormUserComponent } from './admin/users/form-user/form-user.component';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { SwiperModule } from 'swiper/angular';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CateBooksComponent } from './components/cate-books/cate-books.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderListComponent } from './admin/orders/order-list/order-list.component';
import { OrderDetailComponent } from './admin/orders/order-detail/order-detail.component';
import { VerifyOrderComponent } from './client/verify-order/verify-order.component';



registerLocaleData(localeVi, 'vi-VN');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TableComponent,
    TableAvatarComponent,
    TypographyComponent,
    FormComponent,
    ShowValidateComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    ClientHeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    BreadcrumbComponent,
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
    CatgoryFormComponent,
    CategoryListComponent,
    CarouselComponent,
    ProductPanelComponent,
    CartComponent,
    DetailPageComponent,
    ProductPageComponent,
    StatusChangeComponent,
    ImageUploadComponent,
    ListUserComponent,
    FormUserComponent,
    FlashSaleComponent,
    ProductCardComponent,
    CateBooksComponent,
    SearchBarComponent,
    OrderListComponent,
    OrderDetailComponent,
    VerifyOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    [SwiperModule],
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
