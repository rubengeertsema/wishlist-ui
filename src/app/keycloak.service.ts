import { Injectable } from '@angular/core';
import * as Keycloak_ from 'keycloak-js';

// to make 'new Keycloak()' work
const Keycloak: any = (<any>Keycloak_).default || Keycloak_;

import * as env from '../environments/environment';

@Injectable()
export class KeycloakService {

  private keycloakAuth: any;

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': env.environment.auth_base_url,
        'realm': 'wishlist',
        'clientId': 'wishlist-ui'
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({onLoad: 'login-required', checkLoginIframe: false})
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
