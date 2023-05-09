import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { SearchPipe } from './pipes/search.pipe';
import { DeleteAccountComponent } from './delete-account/delete-account.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TransactionsComponent,
    DashboardComponent,
    PageNotFoundComponent,
    FooterComponent,
    SearchPipe,
    DeleteAccountComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
