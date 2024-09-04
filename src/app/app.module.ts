import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { ProductsnavComponent } from './productsnav/productsnav.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent,
        ProductsComponent,
        CartComponent,
        AboutComponent,
        ProductsnavComponent,
        NavbarComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule], providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()) // Enable fetch API for HttpClient
        ,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
