import { ContextMenuModule } from 'primeng/contextmenu';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './interceptors';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, FilterService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { RadioControlRegistry } from 'primeng/radiobutton';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {CascadeSelectModule} from 'primeng/cascadeselect';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerOverlayComponent,
    HomeComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    OverlayModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    RouterModule,
    SharedModule,
    ContextMenuModule,
    CascadeSelectModule,
  ],
  providers: [
    httpInterceptorProviders,
    DatePipe,
    PrimeNGConfig,
    FilterService,
    MessageService,
    ConfirmationService,
    RadioControlRegistry
  ],
  entryComponents: [SpinnerOverlayComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
