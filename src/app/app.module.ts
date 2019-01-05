import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  MatButtonModule,
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import 'hammerjs';

import { AppComponent } from 'app/app.component';
import { AddWishDialogComponent } from 'app/components/add-wish-dialog/add-wish-dialog';
import { WishListService } from 'app/common/services/wishlist.service';
import { TruncatePipe } from 'app/common/pipes/truncate';
import { AppRoutingModule } from 'app/app-routing.module';
import { NavbarComponent } from 'app/components/navbar/navbar.component';
import { WishListComponent } from 'app/components/wish-list/wish-list.component';
import { WishComponent } from 'app/components/wish-card/wish-card.component';
import { AddWishFabButtonComponent } from 'app/components/add-wish-fab-button/add-wish-fab-button.component';
import { WishesEffects } from 'app/common/effects/wishes.effects';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './common/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EditWishDialogComponent } from 'app/components/edit-wish-dialog/edit-wish-dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KeycloakService } from './keycloak.service';
import { TokenInterceptor } from './token.inteceptor';

export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
];

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: kcFactory,
    deps: [KeycloakService],
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    AddWishDialogComponent,
    EditWishDialogComponent,
    NavbarComponent,
    WishListComponent,
    WishComponent,
    AddWishFabButtonComponent
  ],
  entryComponents: [
    AddWishDialogComponent,
    EditWishDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([WishesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    appInitializerProviders,
    MatDialog,
    WishListService,
    httpInterceptorProviders,
    KeycloakService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
